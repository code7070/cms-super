import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ContentWrapper } from ".";
import {
  getFrameCmsId,
  getTimeNow,
  isLogin,
  sendFormPost,
} from "../../helpers/util";
import { setCms } from "../../redux/slices/cms";
import ServiceLayer from "./ServiceLayer";

const ServiceScreen = (props = { service: {} }) => {
  const { service } = props;
  const routePar = useParams();

  const currentCms = useSelector(({ cms }) => cms.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const hasService = service && Object.keys(service).length;

    if (hasService && currentCms !== service.iframe) {
      const now = getTimeNow();
      const target = getFrameCmsId();
      const superAuth = isLogin();
      const { iframe } = service;
      const el = document.getElementById(target);

      const hit = async (params) => {
        if (params && Object.keys(params).length < 1) return "";
        const mainpath = `${iframe}/${routePar.tailcms}?timehook=${now}`;
        console.log("Form Post: ", {
          iframe,
          mainpath,
          tailcms: routePar.tailcms,
        });
        const form = { path: `${iframe}?timehook=${now}`, target };
        await sendFormPost({ ...form, params });

        // DISPATCH IFRAME URL TO REDUCERS
        dispatch(setCms(iframe));
      };

      if (el && el.hasAttribute("src")) hit({ superAuth });
    }
  }, [service, routePar.tailcms, currentCms, dispatch]);

  let servicepage = "No Service Provied";
  if (service && Object.keys(service).length)
    servicepage = <ServiceLayer {...service} />;
  // servicepage = <EmbedService {...service} />;

  return <ContentWrapper>{servicepage}</ContentWrapper>;
};

export default ServiceScreen;
