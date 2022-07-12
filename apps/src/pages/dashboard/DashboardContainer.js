import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import addPropsToChildren from "../../helpers/addPropsToChildren";
import { getServiceMatching } from "./servicelist";
import Sidebar from "./Sidebar";

const DashboardContainer = ({ children }) => {
  const [service, setService] = useState(false);

  const navigate = useNavigate();
  const loc = useLocation();
  const par = useParams();

  console.log("Params: ", par);

  useEffect(() => {
    console.log("LOCATION", loc);
  }, [loc]);

  useEffect(() => {
    if (par.pages) {
      const found = getServiceMatching(par.pages);
      if (found) setService(found);
    }
  }, [par.pages]);

  useEffect(() => {
    const catcher = (e) => {
      if (e && e.data && e.data.pathname) {
        const dataPath = `${e.data.pathname}`;
        const paths = dataPath.charAt(0) === "/" ? dataPath : `/${dataPath}`;
        const path = `https://wknd-otto.my.id/gold${paths}`;
        console.log("Navigate to: ", path);
        // navigate(path, { replace: true });
      }
    };

    window.addEventListener("message", function (event) {
      console.log("SuperCMS is listen: ", event);
      catcher(event);
    });
  }, [navigate]);

  const propsPass = { service };

  return (
    <div className="mx-auto flex">
      <Sidebar {...propsPass} />
      {addPropsToChildren(children, propsPass)}
    </div>
  );
};
export default DashboardContainer;
