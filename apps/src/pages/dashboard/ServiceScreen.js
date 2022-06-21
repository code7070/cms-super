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

  const { pages = "" } = useParams();

  useEffect(() => {
    // setService(false);
    console.log({ pages });
    if (pages) setService(serviceMatching(pages));
  }, [pages]);

  // Coupled with iframe in ServiceLayer to hit iframe
  useEffect(() => {
    if (service) {
      const now = getTimeNow();
      const target = getFrameCmsId();
      const superAuth = isLogin();
      const { iframe } = service[0];
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
  if (service && service.length > 0)
    servicepage = <ServiceLayer {...service[0]} />;
  // servicepage = <EmbedService {...service[0]} />;

  return (
    <ContentWrapper>
      <div className="text-center">
        <div>{servicepage}</div>
      </div>
    </ContentWrapper>
  );
};

export default ServiceScreen;
