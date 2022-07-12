import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainDashboard from "./pages/dashboard/MainDashboard";
// import NewDashboard from "./pages/dashboard/NewDashboard";
import ServiceSection from "./pages/dashboard/ServiceSection";
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
          <Route index element={<ServiceSection />} />
          <Route path=":tailcms" element={<ServiceSection />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
