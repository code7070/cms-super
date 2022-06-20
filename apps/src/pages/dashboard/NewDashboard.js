import { Route, Routes } from "react-router-dom";
import { isLogin } from "../../helpers/util";
import ViewNotLogin from "../../ViewNotLogin";
import DashboardContainer from "./DashboardContainer";
import MainDashboard from "./MainDashboard";
import ServiceScreen from "./ServiceScreen";
import UserInfo from "./UserInfo";

const NewDashboard = () => {
  const login = isLogin();
  let view = <ViewNotLogin />;
  if (login)
    view = (
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="user-info" element={<UserInfo />} />
        <Route path=":pages" element={<ServiceScreen />} />
      </Routes>
    );

  return <DashboardContainer>{view}</DashboardContainer>;
};

export default NewDashboard;
