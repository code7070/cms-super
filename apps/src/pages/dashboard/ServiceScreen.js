import { useEffect } from "react";
import { ContentWrapper } from ".";
import {
  getFrameCmsId,
  getTimeNow,
  isLogin,
  sendFormPost,
} from "../../helpers/util";
import DashboardContainer from "./DashboardContainer";
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

      const hit = async (params) => {
        if (params && Object.keys(params).length < 1) return "";
        const form = { path: `${iframe}?timehook=${now}`, target };
        await sendFormPost({ ...form, params });
      };

      if (el && el.hasAttribute("src")) hit({ superAuth });
    }
  }, [service]);

  let servicepage = "No Service Provied";
  if (service && Object.keys(service).length)
    servicepage = <ServiceLayer {...service} />;
  // servicepage = <EmbedService {...service} />;

  return <ContentWrapper>{servicepage}</ContentWrapper>;
};

export default ServiceScreen;
