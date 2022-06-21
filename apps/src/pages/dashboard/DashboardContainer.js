import Sidebar from "./Sidebar";

const DashboardContainer = ({ children }) => {
  return (
    <div className="mx-auto flex">
      <Sidebar />
      {children}
    </div>
  );
};
export default DashboardContainer;
