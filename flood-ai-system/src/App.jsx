import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResourceManagement from "./pages/ResourceManagement";
import Navbar from "./pages/components/Navbar";
import RoutesManagement from "./pages/RoutesManagement";
import Validators from "./pages/Validators";
import ValidatorLogin from "./pages/validators/ValidatorLogin";
import ValidatorRegister from "./pages/validators/ValidatorRegister";
import ValidatorDashboard from "./pages/validators/ValidatorDashboard";
import RoutesMonitor from "./pages/RoutesMonitor";
import LiveWeatherDisplay from "./pages/LiveWeatherDisplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resources" element={<ResourceManagement />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/routes" element={<RoutesManagement />} />
        <Route path="/validators" element={<Validators />} />
        <Route path="/validator/login" element={<ValidatorLogin />} />
        <Route path="/validator/register" element={<ValidatorRegister />} />
        <Route path="/validator/dashboard" element={<ValidatorDashboard />} />
        <Route path="/routes-monitor" element={<RoutesMonitor />} />
        <Route path="/live-weather" element={<LiveWeatherDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;