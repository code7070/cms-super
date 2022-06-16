import { Routes, Route } from "react-router-dom";
import { isLogin } from "../../helpers/util";
import MainDashboard from "./MainDashboard";
import Sidebar from "./Sidebar";
import ServiceScreen from "./ServiceScreen";
import UserInfo from "./UserInfo";

const DashboardRoute = () => {
  return (
    <Routes>
      <Route index path="/" element={<MainDashboard />} />
      <Route path="user-info" element={<UserInfo />} />
      <Route path=":pages" element={<ServiceScreen />}>
        <Route path=":service" element={<ServiceScreen />} />
      </Route>
    </Routes>
  );
};

const ViewLogin = ({ login }) => {
  return (
    <p className="text-xl text-gray-500 font-bold my-5">
      {login ? `Your login info: ${JSON.stringify(login)}` : `You're not login`}
    </p>
  );
};

const Dashboard = () => {
  const login = isLogin();

  let content = <ViewLogin login={login} />;
  if (login) content = <DashboardRoute />;

  return (
    <div className="container mx-auto flex">
      <div className="flex-initial">
        <Sidebar />
      </div>
      <div className="flex-1 p-10 break-words bg-gray-200 shadow max-h-screen min-h-screen overflow-auto">
        {content}
      </div>
    </div>
  );
};

export default Dashboard;
