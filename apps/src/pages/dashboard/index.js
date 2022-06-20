import { Route, Routes } from "react-router-dom";
import { isLogin } from "../../helpers/util";
import ViewNotLogin from "../../ViewNotLogin";
import MainDashboard from "./MainDashboard";
import ServiceScreen from "./ServiceScreen";
import Sidebar from "./Sidebar";
import UserInfo from "./UserInfo";

export const DashboardRoute = () => {
  const login = isLogin();

  if (login)
    return (
      <Routes>
        <Route path=":pages" element={<ServiceScreen />} />
        <Route index path="main" element={<MainDashboard />} />
        <Route path="user-info" element={<UserInfo />} />
      </Routes>
    );

  return <ViewNotLogin login={login} />;
};

const Dashboard = () => {
  return (
    <div className="container mx-auto flex">
      <Sidebar />
      <div className="flex-1 break-words bg-gray-200 shadow h-screen max-h-screen overflow-auto">
        <DashboardRoute />
      </div>
    </div>
  );
};

export const ContentWrapper = ({ children }) => {
  return (
    <div className="flex-1 break-words bg-gray-200 shadow h-screen max-h-screen overflow-auto">
      {children}
    </div>
  );
};

export default Dashboard;
