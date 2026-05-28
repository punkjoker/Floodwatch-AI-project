import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import WarningIcon from "@mui/icons-material/Warning";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ReportIcon from "@mui/icons-material/Report";
import MapIcon from "@mui/icons-material/Map";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export const validatorMenu = [
  { text: "Overview", icon: <DashboardIcon />, key: "overview" },
  { text: "Chat", icon: <ChatIcon />, key: "chat" },
  { text: "Alerts", icon: <WarningIcon />, key: "alerts" },
  { text: "Routes Monitor", icon: <AltRouteIcon />, key: "routes", path: "/routes-monitor" },
  { text: "Incidents", icon: <ReportIcon />, key: "incidents" },
  { text: "Heatmap", icon: <MapIcon />, key: "heatmap" },
  { text: "Stations", icon: <LocalHospitalIcon />, key: "stations" },
];