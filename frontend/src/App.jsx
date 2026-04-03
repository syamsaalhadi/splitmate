import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Insights from './pages/Insights';
import DebtTracking from './pages/DebtTracking';
import Groups from './pages/Groups';
import GroupDetail from './pages/GroupDetail';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:id" element={<GroupDetail />} />
        <Route path="/friends" element={<DebtTracking />} />
        <Route path="/activity" element={<Notifications />} />
        <Route path="/settings" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
