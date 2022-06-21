import { Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardContainer from "./pages/dashboard/DashboardContainer";
import MainDashboard from "./pages/dashboard/MainDashboard";
import NewDashboard from "./pages/dashboard/NewDashboard";
import ServiceScreen from "./pages/dashboard/ServiceScreen";
import UserInfo from "./pages/dashboard/UserInfo";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="dashboard/*" element={<NewDashboard />} /> */}
      <Route path="dashboard">
        <Route
          index
          element={
            <DashboardContainer>
              <MainDashboard />
            </DashboardContainer>
          }
        />
        <Route
          path="user-info"
          element={
            <DashboardContainer>
              <UserInfo />
            </DashboardContainer>
          }
        />
        <Route
          path=":pages"
          element={
            <DashboardContainer>
              <ServiceScreen />
            </DashboardContainer>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
