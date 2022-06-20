import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentWrapper } from ".";
import Button from "../../components/button";
import { isLogin, sendFormPost } from "../../helpers/util";
import { serviceMatching } from "./servicelist";

const now = new Date().getTime() + Math.floor(Math.random() * 1000000);

const EmbedService = ({
  iframe,
  urlPage,
  iframeWidth,
  iframeHeight,
  iframeTitle,
}) => {
  const [load, setLoad] = useState([]);

  const urlIframe = `${iframe}?timehook=${now}`;
  const frameId = `iframe${urlPage}`;
  const obj = useCallback(
    () => ({ target: frameId, path: urlIframe }),
    [frameId, urlIframe]
  );

  const callIframe = useCallback(() => {
    setLoad(true);
    if (!load && !obj.path.includes("localhost")) {
      console.log("called");
      sendFormPost({
        ...obj,
        params: { superAuth: isLogin() },
      });
    }
  }, [load, obj]);

  useEffect(() => {
    setLoad(false);
    callIframe();
  }, [iframe, callIframe]);

  const forceLogout = () => {
    const frame = document.getElementById(frameId);
    if (frame) {
      const target = frame ? frame.contentWindow : null;
      target.postMessage("logout", "*");
    }
  };

  return (
    <>
      <Button onClick={forceLogout}>Logout</Button>
      <iframe
        id={frameId}
        name={frameId}
        src={urlIframe}
        className="mx-auto rounded-lg"
        width={iframeWidth || 600}
        height={iframeHeight || 400}
        frameBorder={0}
        title={iframeTitle}
        // sandbox="allow-scripts allow-same-origin allow-top-navigation allow-form allow-popups allow-pointer-lock allow-popup-to-escape-sandbox"
        sandbox="allow-scripts allow-modals allow-popups allow-same-origin allow-top-navigation"
      />
    </>
  );
};

const ServiceScreen = () => {
  const [service, setService] = useState(false);

  const { pages = "" } = useParams();

  useEffect(() => {
    setService(false);
    console.log({ pages });
    if (pages) setService(serviceMatching(pages));
  }, [pages]);

  let servicepage = "";
  if (service && service.length > 0)
    servicepage = <EmbedService {...service[0]} />;

  return (
    <ContentWrapper>
      <div className="text-center">{servicepage}</div>
    </ContentWrapper>
  );
};

export default ServiceScreen;
