from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, users, groups, expenses, debts, settlements

app = FastAPI(
    title="SplitMate API",
    description="Backend API untuk aplikasi manajemen patungan SplitMate",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(groups.router)
app.include_router(expenses.router)
app.include_router(debts.router)
app.include_router(settlements.router)

@app.get("/")
def root():
    return {"message": "SplitMate API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
