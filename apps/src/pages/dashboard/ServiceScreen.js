import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isLogin } from "../../helpers/util";
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
  const frameId = `iframe-${urlPage}`;

  useEffect(() => {
    setLoad(false);

    // if (iframe) {
    //   const form = document.createElement("form");
    //   form.action = urlIframe;
    //   form.method = "post";
    //   form.target = frameId;
    //   const hiddenField = document.createElement("input");
    //   hiddenField.type = "hidden";
    //   hiddenField.name = "super-login";
    //   hiddenField.value = isLogin();
    //   form.appendChild(hiddenField);
    //   document.body.appendChild(form);
    //   form.submit();
    //   console.log(`${urlPage} has been firing`);
    // }
  }, [iframe, urlIframe, frameId, urlPage]);

  const callIframe = () => {
    if (load) return false;
    console.log("IFRAME CALLER...", iframe);
    // return console.log("IFRAME CALLER...", iframe);
    const urlIframe = `${iframe}?timehook=${now}`;
    const form = document.createElement("form");
    form.target = frameId;
    form.method = "post";
    form.action = urlIframe;
    const hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = "super-login";
    hiddenField.value = isLogin();
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
    setLoad(true);
  };

  return (
    <>
      {/* <form method="post" target={frameId} action={urlIframe}>
        <input type="hidden" name="superAuth" value={isLogin()} />
        <Button type="submit">ACTIVATE TOKEN</Button>
      </form> */}
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
        onLoad={callIframe}
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
