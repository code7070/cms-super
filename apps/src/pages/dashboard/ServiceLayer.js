import { getFrameCmsId, getTimeNow } from "../../helpers/util";

const now = getTimeNow();

const ServiceLayer = (
  service = {
    iframe: "",
    urlPage: "",
    iframeWidth: "",
    iframeHeight: "",
    iframeTitle: "",
  }
) => {
  if (!service) return "";

  const { iframe, urlPage, iframeWidth, iframeHeight, iframeTitle } = service;

  const frameId = getFrameCmsId();

  const urlIframe = `${iframe}?timehook=${now}`;

  return (
    <>
      <iframe
        id={frameId}
        name={frameId}
        title={iframeTitle}
        src={urlIframe}
        sandbox="allow-scripts allow-modals allow-popups allow-same-origin allow-top-navigation"
        className="max-w-full w-full h-screen"
      />
    </>
  );
};

export default ServiceLayer;
