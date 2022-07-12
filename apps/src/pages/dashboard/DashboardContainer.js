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

  useEffect(() => {
    if (par.pages) {
      const found = getServiceMatching(par.pages);
      if (found) setService(found);
    }
  }, [par.pages]);

  useEffect(() => {
    console.log("Param Changes: ", par);

    const listenMessage = (event) => {
      console.log("Super listen: ", event.data);
      const { pages = "", tailcms = "" } = par;
      const defaults = "/dashboard";
      const fullpath = `${defaults}/${pages}/${tailcms}`;
      console.log(`Navigate to: ${fullpath}`, { fullpath });
    };

    window.addEventListener("message", listenMessage);

    return () => window.removeEventListener("message", listenMessage);
  }, [par, loc.pathname]);

  // useEffect(() => {
  //   const catcher = (e) => {
  //     console.log("SuperCMS is listen  {data}: ", e.data);

  //     const currPath = loc.pathname;
  //     const currPathLength = currPath.length;
  //     // const currSearch = loc.search;

  //     if (e && e.data && e.data.pathname) {
  //       const dataPath = `${e.data.pathname}`;
  //       const paths =
  //         dataPath === "/" || dataPath === "" ? "" : e.data.pathname;
  //       const dataSearch = `${e.data.search}`;
  //       const parentPath =
  //         currPath.charAt(currPathLength - 1) === "/"
  //           ? currPath.slice(currPathLength - 1)
  //           : currPath;
  //       const target = `${parentPath}${paths}${dataSearch}`;
  //       console.log("Navigate to: ", target);
  //       navigate(target, { replace: true });
  //     }
  //     console.log("======================================================");
  //   };

  //   window.addEventListener("message", catcher);

  //   return () => window.removeEventListener("message", catcher);
  // }, [navigate, loc.pathname]);

  const propsPass = { service };

  return (
    <div className="mx-auto flex">
      <Sidebar {...propsPass} />
      {addPropsToChildren(children, propsPass)}
    </div>
  );
};
export default DashboardContainer;
