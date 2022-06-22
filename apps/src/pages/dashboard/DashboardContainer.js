import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import addPropsToChildren from "../../helpers/addPropsToChildren";
import { getFrameCmsId, getTimeNow, sendFormPost } from "../../helpers/util";
import { getServiceMatching } from "./servicelist";
import Sidebar from "./Sidebar";

const DashboardContainer = ({ children }) => {
  const [service, setService] = useState(false);

  const par = useParams();

  useEffect(() => {
    console.log("Params Changed: ", par);
    if (par && par.pages) {
      const found = getServiceMatching(par.pages);
      if (found) setService(found);
    }
  }, [par]);

  const propsPass = { service };

  return (
    <div className="mx-auto flex">
      <Sidebar {...propsPass} />
      {addPropsToChildren(children, propsPass)}
    </div>
  );
};
export default DashboardContainer;
