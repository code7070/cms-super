import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import addPropsToChildren from "../../helpers/addPropsToChildren";
import { getServiceMatching } from "./servicelist";
import Sidebar from "./Sidebar";

const DashboardContainer = ({ children }) => {
  const [service, setService] = useState(false);

  const par = useParams();

  useEffect(() => {
    if (par.pages) {
      const found = getServiceMatching(par.pages);
      if (found) setService(found);
    }
  }, [par.pages]);

  const propsPass = { service };

  return (
    <div className="mx-auto flex">
      <Sidebar {...propsPass} />
      {addPropsToChildren(children, propsPass)}
    </div>
  );
};
export default DashboardContainer;
