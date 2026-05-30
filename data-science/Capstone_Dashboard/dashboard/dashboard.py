import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import streamlit as st
from pathlib import Path
import pandas as pd

sns.set(style="whitegrid")

st.set_page_config(
    page_title="SplitMate Dashboard",
    page_icon="💸",
    layout="wide"
)

def format_rupiah(angka):
    return f"Rp {angka:,.0f}".replace(",", ".")

def format_angka(angka):
    return f"{angka:,.0f}".replace(",", ".")

def short_rupiah(num):
    if num >= 1_000_000_000:
        return f"Rp {num/1_000_000_000:.1f} M"
    elif num >= 1_000_000:
        return f"Rp {num/1_000_000:.1f} Jt"
    elif num >= 1_000:
        return f"Rp {num/1_000:.1f} Rb"
    else:
        return f"Rp {num}"

def generate_colors(data, value_col):
    if data.empty:
        return []

    max_value = data[value_col].max()

    colors = [
        "#FF6B6B" if val == max_value else "#D3D3D3"
        for val in data[value_col]
    ]
    return colors

def card(title, value, desc=""):
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-title">{title}</div>
        <div class="metric-value">{value}</div>
        <div class="metric-desc">{desc}</div>
    </div>
    """, unsafe_allow_html=True)

def insight_box(title, items):
    if isinstance(items, str):
        items = [items]

    list_items = "".join([f"<li>{item}</li>" for item in items])

    st.markdown(
        f"""
        <div class="insight-box">
            <b>{title}</b>
            <ul>
                {list_items}
            </ul>
        </div>
        """,
        unsafe_allow_html=True
    )

#CSS
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

html, body, [class*="css"] {
    font-family: 'Poppins', sans-serif;
}

.main-title {
    font-size: 38px;
    font-weight: 700;
    margin-bottom: 0px;
}

.subtitle {
    color: #B8B8C8;
    font-size: 17px;
    margin-bottom: 25px;
}

.metric-card {
    background: linear-gradient(135deg, #181824, #252538);
    padding: 22px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0px 6px 18px rgba(0,0,0,0.25);
    min-height: 130px;
}

.metric-title {
    color: #BFC0D4;
    font-size: 14px;
    margin-bottom: 10px;
}

.metric-value {
    color: #FFFFFF;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.25;
    word-break: break-word;
}

.metric-desc {
    color: #9B9CB2;
    font-size: 12px;
    margin-top: 8px;
}

.insight-box {
    background-color: #F4F6FA;
    color: #1E1E2F;
    padding: 18px;
    border-radius: 15px;
    border-left: 6px solid #FF6B6B;
    font-size: 15px;
    line-height: 1.6;
}

.insight-box ul {
    margin-top: 12px;
    padding-left: 22px;
}

.insight-box li {
    margin-bottom: 8px;
}

</style>
""", unsafe_allow_html=True)

#Load Data
BASE_DIR = Path(__file__).resolve().parent
df = pd.read_csv(BASE_DIR / "cleaned_finance_data.csv")

df["date"] = pd.to_datetime(df["date"])
df = df.sort_values("date").reset_index(drop=True)
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["year_month"] = df["date"].dt.to_period("M").astype(str)
df["day_name"] = df["date"].dt.day_name()
df["is_weekend"] = df["day_name"].isin(["Saturday", "Sunday"])

tanggal_min = df["date"].min()
tanggal_max = df["date"].max()

#Sidebar
with st.sidebar:
    st.title("💸 SplitMate")
    st.caption("Financial Insight Dashboard")

    menu = st.radio(
        "Pilih Halaman",
        [
            "🏠 Overview",
            "📈 Cashflow Bulanan",
            "🍽️ Kategori Pengeluaran",
            "👤 User Deficit",
            "💳 Payment Method",
            "🔥 High Spending"
        ]
    )
    st.divider()
    st.subheader("Filter Data")

    start_date = st.date_input("Tanggal mulai", tanggal_min)
    end_date = st.date_input("Tanggal akhir", tanggal_max)

    selected_transaction = st.multiselect(
        "Jenis Transaksi",
        df["transaction_type"].unique(),
        default=df["transaction_type"].unique()
    )

    selected_category = st.multiselect(
        "Kategori",
        df["category"].unique(),
        default=df["category"].unique()
    )

    selected_payment = st.multiselect(
        "Metode Pembayaran",
        df["payment_mode"].unique(),
        default=df["payment_mode"].unique()
    )

    selected_location = st.multiselect(
        "Lokasi",
        df["location"].unique(),
        default=df["location"].unique()
    )

main_df = df[
    (df["date"] >= pd.to_datetime(start_date)) &
    (df["date"] <= pd.to_datetime(end_date)) &
    (df["transaction_type"].isin(selected_transaction)) &
    (df["category"].isin(selected_category)) &
    (df["payment_mode"].isin(selected_payment)) &
    (df["location"].isin(selected_location))
]

with st.sidebar:
    st.divider()
    st.caption(f"📊 Data tersedia: {format_angka(len(main_df))} transaksi")

#Data Ringkasan
income_df = main_df[main_df["transaction_type"] == "income"]
expense_df = main_df[main_df["transaction_type"] == "expense"]
total_income = income_df["amount_idr"].sum()
total_expense = expense_df["amount_idr"].sum()
saldo_bersih = total_income - total_expense
total_transaksi = len(main_df)
total_user = main_df["user_id"].nunique()

#Header
st.markdown('<div class="main-title">SplitMate Financial Dashboard</div>', unsafe_allow_html=True)
st.markdown(
    '<div class="subtitle">Dashboard EDA interaktif untuk memahami pola pengeluaran, cashflow, dan insight keuangan pengguna Gen Z.</div>',
    unsafe_allow_html=True
)

#Overview
if menu == "🏠 Overview":
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        card(
            "Jumlah Transaksi",
            format_angka(total_transaksi),
            "Total transaksi terfilter"
        )
    with col2:
        card(
            "Total User",
            format_angka(total_user),
            "Pengguna aktif"
        )
    with col3:
        card(
            "Total Income",
            short_rupiah(total_income),
            "Akumulasi pemasukan"
        )
    with col4:
        card(
            "Total Expense",
            short_rupiah(total_expense),
            "Akumulasi pengeluaran"
        )

    st.divider()
    kondisi_saldo = "surplus" if saldo_bersih >= 0 else "defisit"

    insight_box(
        "📌 Insight Overview",
        [
            f"Total transaksi tercatat sebanyak <b>{format_angka(total_transaksi)}</b> transaksi.",
            f"Jumlah pengguna aktif mencapai <b>{format_angka(total_user)}</b> pengguna.",
            f"Total pemasukan sebesar <b>{short_rupiah(total_income)}</b>.",
            f"Total pengeluaran sebesar <b>{short_rupiah(total_expense)}</b>.",
            f"Kondisi cashflow saat ini berada dalam keadaan <b>{'surplus' if saldo_bersih >= 0 else 'defisit'}</b> dengan saldo bersih sebesar <b>{short_rupiah(abs(saldo_bersih))}</b>."
        ]
    )

#Cashflow Bulanan
elif menu == "📈 Cashflow Bulanan":
    st.subheader("Cashflow Bulanan")

    monthly = (
        main_df.groupby(["year_month", "transaction_type"])["amount_idr"]
        .sum()
        .reset_index()
    )

    pivot_monthly = monthly.pivot(
        index="year_month",
        columns="transaction_type",
        values="amount_idr"
    ).fillna(0).reset_index()

    if "income" not in pivot_monthly.columns:
        pivot_monthly["income"] = 0
    if "expense" not in pivot_monthly.columns:
        pivot_monthly["expense"] = 0
    pivot_monthly["net_cashflow"] = pivot_monthly["income"] - pivot_monthly["expense"]

    fig, ax = plt.subplots(figsize=(14, 6))

    ax.plot(
        pivot_monthly["year_month"],
        pivot_monthly["income"],
        marker="o",
        label="Income",
        color="#1E8B84",
        linewidth=2
    )

    ax.plot(
        pivot_monthly["year_month"],
        pivot_monthly["expense"],
        marker="o",
        label="Expense",
        color="#FF6B6B",
        linewidth=2
    )

    ax.set_title("Tren Income dan Expense per Bulan")
    ax.set_xlabel("Bulan")
    ax.set_ylabel("Nominal")
    ax.tick_params(axis="x", rotation=45)
    ax.legend()
    ax.grid(alpha=0.3)

    st.pyplot(fig)

    col1, col2 = st.columns([3, 1.5])
    with col1:
        st.subheader("Aktivitas Transaksi Harian")
        daily_transaction = (
            main_df.groupby("day_name")
            .agg(
                total_nominal=("amount_idr", "sum"),
                jumlah_transaksi=("amount_idr", "count")
            )
            .reindex([
                "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday"
            ])
            .reset_index()
        )
        colors = generate_colors(daily_transaction, "total_nominal")
        fig, ax1 = plt.subplots(figsize=(12, 5))
        sns.barplot(
            data=daily_transaction,
            x="day_name",
            y="total_nominal",
            hue="day_name",
            palette=colors,
            legend=False,
            ax=ax1
        )

        ax1.set_title("Total Nominal dan Jumlah Transaksi per Hari")
        ax1.set_xlabel("Hari")
        ax1.set_ylabel("Total Nominal")
        ax1.tick_params(axis="x", rotation=20)
        ax1.grid(False)

        for p in ax1.patches:
            ax1.annotate(
                short_rupiah(p.get_height()),
                (
                    p.get_x() + p.get_width() / 2,
                    p.get_height()
                ),
                ha="center",
                va="bottom",
                fontsize=8
            )

        ax2 = ax1.twinx()
        ax2.plot(
            daily_transaction["day_name"],
            daily_transaction["jumlah_transaksi"],
            color="#1E8B84",
            marker="o",
            linewidth=2
        )

        for x, y in zip(daily_transaction["day_name"], daily_transaction["jumlah_transaksi"]):
            ax2.annotate(
                format_angka(y),
                (x, y),
                textcoords="offset points",
                xytext=(0, 3),
                ha="center",
                va="bottom",
                fontsize=8,
                fontweight="bold",
                color="#1E8B84"
            )
        
        ax2.set_ylabel("Jumlah Transaksi")
        ax2.grid(False)

        plt.tight_layout()
        st.pyplot(fig)

    with col2:
        st.subheader("Weekday vs Weekend")
        weekend_summary = (
            main_df.groupby("is_weekend")["amount_idr"]
            .sum()
            .reset_index()
        )

        weekend_summary["tipe_hari"] = weekend_summary["is_weekend"].map({
            True: "Weekend",
            False: "Weekday"
        })
        colors = generate_colors(weekend_summary, "amount_idr")
        fig, ax = plt.subplots(figsize=(5, 4))
        sns.barplot(
            data=weekend_summary,
            x="tipe_hari",
            y="amount_idr",
            hue="tipe_hari",
            palette=colors,
            legend=False,
            ax=ax
        )
        ax.set_title("Weekday vs Weekend")

        for p in ax.patches:
            ax.annotate(
                short_rupiah(p.get_height()),
                (p.get_x() + p.get_width()/2, p.get_height()),
                ha="center",
                va="bottom",
                fontsize=8
            )

        plt.tight_layout()
        st.pyplot(fig)

    st.subheader("Surplus / Defisit Bulanan")
    fig, ax = plt.subplots(figsize=(16, 5))
    colors = [
        "#1E8B84" if value >= 0 else "#FF6B6B"
        for value in pivot_monthly["net_cashflow"]
    ]

    ax.bar(
        pivot_monthly["year_month"],
        pivot_monthly["net_cashflow"],
        color=colors
    )

    ax.axhline(0, color="black", linewidth=1)
    ax.set_title("Net Cashflow Bulanan")
    ax.set_xlabel("Bulan")
    ax.set_ylabel("Income - Expense")
    ax.tick_params(axis="x", rotation=45)
    plt.tight_layout()
    st.pyplot(fig)

    bulan_defisit = (pivot_monthly["net_cashflow"] < 0).sum()

    top_day = daily_transaction.sort_values(
        by="total_nominal",
        ascending=False
    ).iloc[0]["day_name"]

    weekday_total = weekend_summary.loc[
        weekend_summary["tipe_hari"] == "Weekday",
        "amount_idr"
    ].values[0]

    weekend_total = weekend_summary.loc[
        weekend_summary["tipe_hari"] == "Weekend",
        "amount_idr"
    ].values[0]

    insight_box(
        "📌 Insight Cashflow",
        [
            f"Terdapat <b>{bulan_defisit}</b> bulan dengan kondisi defisit.",
            f"Aktivitas transaksi tertinggi terjadi pada hari <b>{top_day}</b>.",
            f"Total transaksi pada <b>weekday</b> mencapai <b>{short_rupiah(weekday_total)}</b>.",
            f"Total transaksi pada <b>weekend</b> mencapai <b>{short_rupiah(weekend_total)}</b>.",
            "Pola ini menunjukkan bahwa pengguna cenderung lebih aktif melakukan transaksi pada hari kerja dibanding akhir pekan."
        ]
    )

#Kategori Pengeluaran
elif menu == "🍽️ Kategori Pengeluaran":
    st.subheader("Analisis Kategori Pengeluaran")

    category_df = (
        expense_df.groupby("category")
        .agg(
            total_pengeluaran=("amount_idr", "sum"),
            jumlah_transaksi=("amount_idr", "count")
        )
        .sort_values(by="total_pengeluaran", ascending=False)
        .reset_index()
    )

    if not category_df.empty:
        col1, col2 = st.columns(2)
        with col1:
            colors = generate_colors(category_df, "total_pengeluaran")
            fig, ax = plt.subplots(figsize=(8, 5))

            sns.barplot(
                data=category_df,
                x="category",
                y="total_pengeluaran",
                hue="category",
                palette=colors,
                legend=False,
                ax=ax
            )

            ax.set_title("Total Pengeluaran per Kategori")
            ax.set_xlabel("Kategori")
            ax.set_ylabel("Total Pengeluaran")
            ax.tick_params(axis="x", rotation=30)

            for p in ax.patches:
                ax.annotate(
                    short_rupiah(p.get_height()),
                    (p.get_x() + p.get_width() / 2, p.get_height()),
                    ha="center",
                    va="bottom",
                    fontsize=8
                )

            plt.tight_layout()
            st.pyplot(fig)

        with col2:
            transaction_df = category_df.sort_values(
                by="jumlah_transaksi",
                ascending=False
            )
            colors = generate_colors(transaction_df, "jumlah_transaksi")
            fig, ax = plt.subplots(figsize=(8, 5))

            sns.barplot(
                data=transaction_df,
                x="category",
                y="jumlah_transaksi",
                hue="category",
                palette=colors,
                legend=False,
                ax=ax
            )

            ax.set_title("Jumlah Transaksi per Kategori")
            ax.set_xlabel("Kategori")
            ax.set_ylabel("Jumlah Transaksi")
            ax.tick_params(axis="x", rotation=30)

            for p in ax.patches:
                ax.annotate(
                    format_angka(p.get_height()),
                    (p.get_x() + p.get_width() / 2, p.get_height()),
                    ha="center",
                    va="bottom",
                    fontsize=8
                )

            plt.tight_layout()
            st.pyplot(fig)

        top_category = category_df.iloc[0]["category"]
        top_amount = category_df.iloc[0]["total_pengeluaran"]
        top_transaction_category = category_df.sort_values(
            by="jumlah_transaksi",
            ascending=False
        ).iloc[0]["category"]

        top_transaction_count = category_df.sort_values(
            by="jumlah_transaksi",
            ascending=False
        ).iloc[0]["jumlah_transaksi"]

        insight_box(
            "📌 Insight Kategori",
            [
                f"Kategori <b>{top_category}</b> menjadi kategori dengan total pengeluaran terbesar.",
                f"Total pengeluaran pada kategori tersebut mencapai <b>{format_rupiah(top_amount)}</b>.",
                f"Kategori dengan jumlah transaksi terbanyak adalah <b>{top_transaction_category}</b> sebanyak <b>{format_angka(top_transaction_count)}</b> transaksi.",
                "Informasi ini dapat membantu SplitMate mengidentifikasi kategori pengeluaran yang paling dominan dari sisi nominal maupun frekuensi transaksi."
            ]
        )
    else:
        st.info("Tidak ada data pengeluaran pada filter yang dipilih.")

#User Deficit
elif menu == "👤 User Deficit":
    st.subheader("Analisis User dengan Defisit Terbesar")
    if "user_id" in main_df.columns:
        user_cashflow = (
            main_df.groupby(["user_id", "transaction_type"])["amount_idr"]
            .sum()
            .reset_index()
            .pivot(index="user_id", columns="transaction_type", values="amount_idr")
            .fillna(0)
            .reset_index()
        )

        if "income" not in user_cashflow.columns:
            user_cashflow["income"] = 0
        if "expense" not in user_cashflow.columns:
            user_cashflow["expense"] = 0

        user_cashflow["net_cashflow"] = user_cashflow["income"] - user_cashflow["expense"]
        deficit_user = user_cashflow.sort_values("net_cashflow").head(10)

        if not deficit_user.empty:
            min_value = deficit_user["net_cashflow"].min()
            colors = [
                "#FF6B6B" if value == min_value else "#D3D3D3"
                for value in deficit_user["net_cashflow"]
            ]
            fig, ax = plt.subplots(figsize=(12, 6))

            sns.barplot(
                data=deficit_user,
                x="net_cashflow",
                y="user_id",
                hue="user_id",
                palette=colors,
                ax=ax
            )

            ax.set_title("Top 10 User dengan Defisit Terbesar")
            ax.set_xlabel("Net Cashflow")
            ax.set_ylabel("User ID")

            for p in ax.patches:
                value = p.get_width()
                ax.annotate(
                    format_rupiah(abs(value)),
                    (
                        value * 0.95,
                        p.get_y() + p.get_height() / 2
                    ),
                    ha="right",
                    va="center",
                    fontsize=8,
                    fontweight="bold",
                    color="#1E1E2F"
                )
            st.pyplot(fig)
            jumlah_defisit = (user_cashflow["net_cashflow"] < 0).sum()

            insight_box(
                "📌 Insight User Deficit",
                [
                    f"Terdapat <b>{jumlah_defisit}</b> pengguna yang mengalami defisit.",
                    "Kondisi ini menunjukkan adanya pengguna dengan pengeluaran lebih besar daripada pemasukan.",
                    "Pola ini dapat menjadi dasar fitur financial score atau peringatan otomatis pada SplitMate."
                ]
            )
        else:
            st.info("Tidak ada data user pada filter yang dipilih.")
    else:
        st.warning("Kolom `user_id` tidak ditemukan pada dataset.")

#Payment Method
elif menu == "💳 Payment Method":
    st.subheader("Analisis Metode Pembayaran")
    payment_count = main_df["payment_mode"].value_counts().reset_index()
    payment_count.columns = ["payment_mode", "jumlah_transaksi"]
    payment_amount = (
        main_df.groupby("payment_mode")["amount_idr"]
        .sum()
        .sort_values(ascending=False)
        .reset_index()
    )

    col1, col2 = st.columns(2)
    with col1:
        if not payment_count.empty:
            colors = generate_colors(payment_count, "jumlah_transaksi")
            fig, ax = plt.subplots(figsize=(7, 5))

            sns.barplot(
                data=payment_count,
                x="payment_mode",
                y="jumlah_transaksi",
                hue="payment_mode",
                palette=colors,
                ax=ax
            )

            ax.set_title("Frekuensi Metode Pembayaran")
            ax.set_xlabel("Metode Pembayaran")
            ax.set_ylabel("Jumlah Transaksi")
            ax.tick_params(axis="x", rotation=30)

            for p in ax.patches:
                ax.annotate(
                    format_angka(p.get_height()),
                    (p.get_x() + p.get_width() / 2, p.get_height()),
                    ha="center",
                    va="bottom",
                    fontsize=8
                )

            st.pyplot(fig)
        else:
            st.info("Tidak ada data metode pembayaran.")

    with col2:
        if not payment_amount.empty:
            colors = generate_colors(payment_amount, "amount_idr")
            fig, ax = plt.subplots(figsize=(7, 5))

            sns.barplot(
                data=payment_amount,
                x="payment_mode",
                y="amount_idr",
                hue="tipe_hari",
                palette=colors,
                ax=ax
            )

            ax.set_title("Total Nominal per Metode Pembayaran")
            ax.set_xlabel("Metode Pembayaran")
            ax.set_ylabel("Total Nominal")
            ax.tick_params(axis="x", rotation=30)

            for p in ax.patches:
                ax.annotate(
                    format_rupiah(p.get_height()),
                    (p.get_x() + p.get_width() / 2, p.get_height()),
                    ha="center",
                    va="bottom",
                    fontsize=8
                )
            st.pyplot(fig)
        else:
            st.info("Tidak ada data nominal metode pembayaran.")

    top_payment = payment_count.iloc[0]["payment_mode"] if not payment_count.empty else "-"

    insight_box(
        "📌 Insight Payment Method",
        [
            f"Metode pembayaran yang paling sering digunakan adalah <b>{top_payment}</b>.",
            "Informasi ini dapat membantu SplitMate menentukan prioritas integrasi pembayaran.",
            "Metode pembayaran dominan juga dapat digunakan untuk memahami preferensi transaksi pengguna."
        ]
    )

#High Spending
elif menu == "🔥 High Spending":
    st.subheader("Analisis High Spending")

    if not expense_df.empty:
        threshold = expense_df["amount_idr"].quantile(0.75)
        high_spending = expense_df[expense_df["amount_idr"] >= threshold]

        col1, col2, col3 = st.columns(3)
        with col1:
            card("Batas High Spending", format_rupiah(threshold), "Kuartil 75 pengeluaran")
        with col2:
            card("Jumlah High Spending", format_angka(len(high_spending)), "Transaksi besar")
        with col3:
            card("Total High Spending", format_rupiah(high_spending["amount_idr"].sum()), "Akumulasi transaksi besar")

        st.divider()

        high_monthly = (
            high_spending.groupby("year_month")["amount_idr"]
            .sum()
            .reset_index()
        )
        st.subheader("Tren High Spending per Bulan")
        fig, ax = plt.subplots(figsize=(14, 6))

        ax.plot(
            high_monthly["year_month"],
            high_monthly["amount_idr"],
            marker="o",
            color="#FF6B6B",
            linewidth=2
        )

        ax.set_title("Tren High Spending per Bulan")
        ax.set_xlabel("Bulan")
        ax.set_ylabel("Nominal High Spending")
        ax.tick_params(axis="x", rotation=45)
        ax.grid(alpha=0.3)
        st.pyplot(fig)

        weekend_summary = (
            high_spending.groupby("is_weekend")["amount_idr"]
            .sum()
            .reset_index()
        )

        weekend_summary["tipe_hari"] = weekend_summary["is_weekend"].map({
            True: "Weekend",
            False: "Weekday"
        })

        st.subheader("High Spending: Weekday vs Weekend")
        colors = generate_colors(weekend_summary, "amount_idr")
        fig, ax = plt.subplots(figsize=(8, 5))

        sns.barplot(
            data=weekend_summary,
            x="tipe_hari",
            y="amount_idr",
            palette=colors,
            ax=ax
        )

        ax.set_title("High Spending: Weekday vs Weekend")
        ax.set_xlabel("Tipe Hari")
        ax.set_ylabel("Total High Spending")

        for p in ax.patches:
            ax.annotate(
                format_rupiah(p.get_height()),
                (p.get_x() + p.get_width() / 2, p.get_height()),
                ha="center",
                va="bottom",
                fontsize=8
            )
        st.pyplot(fig)

        insight_box(
            "📌 Insight High Spending",
            [
                f"Transaksi high spending didefinisikan sebagai pengeluaran di atas <b>{format_rupiah(threshold)}</b>.",
                "Transaksi besar perlu dipantau karena dapat memengaruhi stabilitas cashflow pengguna.",
                "Analisis ini dapat digunakan SplitMate untuk memberi notifikasi ketika pengguna melakukan transaksi besar."
            ]
        )
    else:
        st.warning("Tidak ada data expense pada filter yang dipilih.")

st.caption("Copyright © SplitMate Capstone Project | Coding Camp 2026")
