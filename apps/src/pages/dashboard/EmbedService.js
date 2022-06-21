import { useEffect } from "react";
import Button from "../../components/button";
import { getTimeNow, isLogin, sendFormPost } from "../../helpers/util";

const now = getTimeNow();

const EmbedService = (service) => {
  const { iframe, urlPage, iframeWidth, iframeHeight, iframeTitle } = service;

  const urlIframe = `${iframe}?timehook=${now}`;
  // const frameId = `iframe${urlPage}`;
  const frameId = "cms-frame";

  useEffect(() => {
    const { urlPage, iframe: iframs } = service;
    const idFrame = `iframe${urlPage}`;
    const params = { superAuth: isLogin() };
    const objs = { target: idFrame, path: `${iframs}?timehook=${now}` };
    sendFormPost({ ...objs, params });
  }, [service]);

  const forceLogout = async () => {
    const frame = document.getElementById(frameId);
    console.log(frame);
    if (frame) {
      sendFormPost({ superAuth: false });
      const target = frame ? frame.contentWindow : null;
      target.postMessage("logout", "*");
      frame.src = urlIframe;
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

export default EmbedService;
