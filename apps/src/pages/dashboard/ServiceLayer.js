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

  return (
    <>
      <iframe
        id={frameId}
        name={frameId}
        title={iframeTitle}
        src={urlIframe}
        sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation"
        className="max-w-full w-full h-screen"
      />
    </>
  );
};

export default ServiceLayer;
