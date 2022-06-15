import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import { isLogin } from "../../helpers/util";
import { serviceMatching } from "./servicelist";

const EmbedService = ({
  iframe,
  urlPage,
  iframeWidth,
  iframeHeight,
  iframeTitle,
}) => {
  const [set, setSet] = useState(false);
  const now = new Date().getTime() + Math.floor(Math.random() * 1000000);
  const urlIframe = `${iframe}?timehook=${now}`;

  const frameId = `iframe-${urlPage}`;

  return (
    <>
      <div className="my-4">
        <span className="font-bold">iframe url:</span>{" "}
        {JSON.stringify(urlIframe)}
      </div>
      {/* <Embed url={urlIframe} width={iframeWidth || 600} /> */}
      <form method="post" action={iframe} target={frameId}>
        <input type="hidden" name="superAuth" value={isLogin()} />
        <Button type="submit" onClick={() => setSet(true)}>
          ACTIVATE TOKEN
        </Button>
      </form>
      <iframe
        className="mx-auto rounded-lg"
        name={frameId}
        width={iframeWidth || 600}
        height={iframeHeight || 400}
        frameBorder={0}
        src={urlIframe}
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
    <div className="p-10 text-center">
      <p className="text-3xl text-gray-700 font-bold mb-5">CMS - {pages}</p>
      <p>{JSON.stringify(service)}</p>
      <p>{servicepage}</p>
    </div>
  );
};

export default ServiceScreen;
