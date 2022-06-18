import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [load, setLoad] = useState(false);

  const urlIframe = `${iframe}?timehook=${now}`;
  const frameId = `iframe${urlPage}`;

  const callIframe = useCallback(() => {
    setLoad(true);
    if (!load && !iframe.includes("localhost"))
      sendFormPost({
        path: urlIframe,
        target: frameId,
        params: { superAuth: isLogin() },
      });
  }, [load, urlIframe]);

  useEffect(() => {
    setLoad(false);
    callIframe();
  }, [iframe, callIframe]);

  return (
    <>
      {/* <form method="post" action={urlIframe} target={frameId}>
        <input type="hidden" name="superAuth" value={isLogin()} />
        <Button onClick={callIframe} type="button">
          TOKEN VIA JS
        </Button>
        &nbsp; &nbsp;
        <Button type="submit">TOKEN VIA FORM</Button>
      </form> */}
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
        sandbox="allow-scripts allow-same-origin allow-top-navigation"
      />
    </>
  );
};

const ServiceScreen = () => {
  const [service, setService] = useState(false);

  const { pages = "" } = useParams();

  useEffect(() => {
    setService(false);
    if (pages) setService(serviceMatching(pages));
  }, [pages]);

  let servicepage = "";
  if (service && service.length > 0)
    servicepage = <EmbedService {...service[0]} />;

  return (
    <div className="text-center">
      {/* <p className="text-3xl text-gray-700 font-bold mb-5">CMS - {pages}</p> */}
      {/* <p>{JSON.stringify(service)}</p> */}
      <p>{servicepage}</p>
    </div>
  );
};

export default ServiceScreen;
