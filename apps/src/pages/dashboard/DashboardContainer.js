import Sidebar from "./Sidebar";

const DashboardContainer = ({ children }) => {
  return (
    <div className="container mx-auto flex">
      <Sidebar />
      {children}
    </div>
  );
};
export default DashboardContainer;
