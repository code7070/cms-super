import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainDashboard from "./pages/dashboard/MainDashboard";
// import NewDashboard from "./pages/dashboard/NewDashboard";
import ServiceScreen from "./pages/dashboard/ServiceScreen";
import UserInfo from "./pages/dashboard/UserInfo";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard">
        <Route index element={<MainDashboard />} />
        <Route path="user-info" element={<UserInfo />} />
        <Route path=":pages">
          <Route index element={<ServiceScreen />} />
          <Route path=":tailcms" element={<ServiceScreen />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
