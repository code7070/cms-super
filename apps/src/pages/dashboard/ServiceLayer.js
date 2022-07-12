import { getFrameCmsId, getTimeNow, isLocal } from "../../helpers/util";

const now = getTimeNow();

const ServiceLayer = (
  service = {
    iframe: "",
    urlPage: "",
    iframeWidth: "",
    iframeHeight: "",
    iframeTitle: "",
    localFrame: "",
  }
) => {
  if (!service) return "";

  const { iframe, iframeTitle, localFrame } = service;

  const frameId = getFrameCmsId();
  const frame = isLocal && localFrame ? localFrame : iframe;
  const urlIframe = `${frame}?timehook=${now}`;

  const frameLoaded = (e) => {
    console.log("iframe loaded", e);
    const frameCMS = document.getElementById(frameId);
    if (frameCMS && frameCMS.contentWindow) {
      console.log("href: ", frameCMS.contentWindow.location.href);
    }
  };

  return (
    <iframe
      onLoad={frameLoaded}
      id={frameId}
      name={frameId}
      title={iframeTitle}
      src={urlIframe}
      allow=""
      sandbox="allow-scripts allow-same-origin allow-top-navigation"
      className="max-w-full w-full h-screen"
    />
  );
};

export default ServiceLayer;
