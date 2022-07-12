import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addPropsToChildren from "../../helpers/addPropsToChildren";
import { getServiceMatching } from "./servicelist";
import Sidebar from "./Sidebar";

const DashboardContainer = ({ children }) => {
  const [service, setService] = useState(false);

  const navigate = useNavigate();
  const par = useParams();

  console.log("Params: ", par);

  useEffect(() => {
    if (par.pages) {
      const found = getServiceMatching(par.pages);
      if (found) setService(found);
    }
  }, [par.pages]);

  useEffect(() => {
    const catcher = (e) => {
      if (e && e.data && e.data.pathname) {
        const path = `https://wknd-otto.my.id/gold/${pathname}`;
        navigate(path, { replace: true });
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
