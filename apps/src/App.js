import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardContainer from "./pages/dashboard/DashboardContainer";
import MainDashboard from "./pages/dashboard/MainDashboard";
// import NewDashboard from "./pages/dashboard/NewDashboard";
import ServiceScreen from "./pages/dashboard/ServiceScreen";
import UserInfo from "./pages/dashboard/UserInfo";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    window.addEventListener("message", function (event) {
      console.log("SuperCMS is listen: ", event);
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
        <Route path=":pages">
          <Route
            index
            element={
              <DashboardContainer>
                <ServiceScreen />
              </DashboardContainer>
            }
          />
          <Route
            path=":cmsFree"
            element={
              <DashboardContainer>
                <h2>This is CMS FREE</h2>
                <ServiceScreen />
              </DashboardContainer>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
