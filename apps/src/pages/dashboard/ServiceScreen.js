import { useEffect } from "react";
import { ContentWrapper } from ".";
import {
  getFrameCmsId,
  getTimeNow,
  isLogin,
  sendFormPost,
} from "../../helpers/util";
import ServiceLayer from "./ServiceLayer";

const ServiceScreen = (props = { service: {} }) => {
  const { service } = props;

  useEffect(() => {
    if (service && Object.keys(service).length) {
      const now = getTimeNow();
      const target = getFrameCmsId();
      const superAuth = isLogin();
      const { iframe } = service;
      const el = document.getElementById(target);

      const hit = (params) => {
        if (params && Object.keys(params).length < 1) return "";
        const form = { path: `${iframe}?timehook=${now}`, target };
        sendFormPost({ ...form, params });
      };

      if (el && el.hasAttribute("src")) hit({ superAuth });
    }
  }, [service]);

  let servicepage = "";
  if (service && Object.keys(service).length)
    servicepage = <ServiceLayer {...service} />;
  // servicepage = <EmbedService {...service} />;

  return (
    <ContentWrapper>
      <div>
        <button
          className="mx-4"
          onClick={() => {
            const url = `${service.iframe}/logout`;
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
            const { iframe } = service;
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
            const { iframe } = service;
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
            const { iframe } = service;
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
