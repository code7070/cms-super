import { ContentWrapper } from ".";
import DashboardContainer from "./DashboardContainer";

const MainDashboard = () => {
  return (
    <DashboardContainer>
      <ContentWrapper>
        <p className="text-2xl text-gray-800">MAIN DASHBOARD</p>
        <p className="text-1xl text-gray-800">CONTENT HERE</p>
        <p className="my-10 text-l">Use aside link for navigate</p>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default MainDashboard;
