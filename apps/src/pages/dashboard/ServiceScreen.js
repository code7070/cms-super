import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentWrapper } from ".";
import {
  getFrameCmsId,
  getTimeNow,
  isLogin,
  sendFormPost,
} from "../../helpers/util";
import ServiceLayer from "./ServiceLayer";
import { serviceMatching } from "./servicelist";

const ServiceScreen = () => {
  const [service, setService] = useState(false);

  // const loc = useLocation();
  const { pages = "" } = useParams();

  // useEffect(() => {
  //   console.log("CHANGES: ", loc);
  //   const { pathname: path, state: locState } = loc;
  //   const prev = locState.prev;
  //   if (path !== prev) {
  //     // console.log("Different: ", { path, prev });
  //     const found = servicelist.find((i) => i.link === prev);
  //     if (found && Object.keys(found).length > 0) {
  //       // console.log("Found: ", found);
  //       const now = getTimeNow();
  //       const target = getFrameCmsId();
  //       const { iframe } = found;
  //       const form = { path: `${iframe}?timehook=${now}`, target };
  //       const params = { superAuth: "" };
  //       // sendFormPost({...form, params})
  //       console.log("POST: ", { ...form, params });
  //     }
  //   }
  //   console.log("====================================================");
  // }, [loc]);

  useEffect(() => {
    if (pages) setService(serviceMatching(pages));
  }, [pages]);

  // Coupled with iframe in ServiceLayer to hit iframe
  useEffect(() => {
    if (service && service.length > 0) {
      const now = getTimeNow();
      const target = getFrameCmsId();
      const superAuth = isLogin();
      const { iframe } = service[0];
      const el = document.getElementById(target);

      const hit = (params) => {
        if (params && Object.keys(params).length < 1) return "";
        const form = { path: `${iframe}?timehook=${now}`, target };
        const remBody = { ...form, params: { deleteAuth: "deleteAuth" } };
        console.log("BODY: ", remBody);
        // sendFormPost(remBody);
        sendFormPost({ ...form, params });
      };

      if (el && el.hasAttribute("src")) hit({ superAuth });
    }
  }, [service]);

  let servicepage = "";
  if (service && service.length > 0)
    servicepage = <ServiceLayer {...service[0]} />;
  // servicepage = <EmbedService {...service[0]} />;

  return (
    <ContentWrapper>
      <div>
        <button
          className="mx-4"
          onClick={() => {
            const url = `${service[0].iframe}/logout`;
            console.log("Starting fetch: ", url);
            fetch(url, { method: "GET" })
              .then((res) => res.json())
              .then(() => console.log("FETCHING... DONE"));
          }}
        >
          Logout using fetch
        </button>
        <button
          className="mx-4"
          onClick={() => {
            const now = getTimeNow();
            const target = getFrameCmsId();
            const { iframe } = service[0];
            const form = { path: `${iframe}?timehook=${now}`, target };
            const remBody = { ...form, params: { deleteAuth: "deleteAuth" } };
            sendFormPost(remBody);
          }}
        >
          Logout using Form POST
        </button>
        <button
          className="mx-4"
          onClick={() => {
            console.log("Starting POST...");
            const now = getTimeNow();
            const target = getFrameCmsId();
            const { iframe } = service[0];
            const path = `${iframe}?timehook=${now}`;
            const params = { deleteAuth: "deleteAuth" };
            const formBody = { path, target, params };
            const body = new FormData();
            body.append("deleteAuth", "deleteAuth");
            fetch(path, { method: "POST", body }).then((res) => {
              alert("Fetching POST Logout Done");
            });
          }}
        >
          Logout using fetch POST
        </button>
        <button
          className="mx-4"
          onClick={() => {
            console.log("Starting GET...");
            const now = getTimeNow();
            const target = getFrameCmsId();
            const { iframe } = service[0];
            const path = `${iframe}/logout?timehook=${now}`;
            const params = { deleteAuth: "deleteAuth" };
            const formBody = { path, target, params };
            const body = new FormData();
            body.append("deleteAuth", "deleteAuth");
            fetch(path, { method: "POST" }).then((res) => {
              alert("Fetching GET Logout Done");
            });
          }}
        >
          Logout using fetch GET
        </button>
      </div>
      <div>{servicepage}</div>
    </ContentWrapper>
  );
};

export default ServiceScreen;
