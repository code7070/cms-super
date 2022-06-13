import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serviceMatching } from "./servicelist";

const SidebarService = () => {
  const [service, setService] = useState(false);

  const { pages = "", service: serviceParams = "" } = useParams();

  useEffect(() => {
    setService(false);
    if (pages) setService(serviceMatching(pages));
  }, [pages]);

  return (
    <div className="p-10 border-4 border-gray-600 text-center">
      <p className="text-3xl text-gray-700 font-bold mb-5">CMS - {pages}</p>
      <p>{JSON.stringify(service)}</p>
      <p>
        {service && service.length > 0 && (
          <iframe
            width={service.iframeWidth || 600}
            height={service.iframeHeight || 400}
            frameBorder={0}
            src={service[0].iframe}
            title={service[0].iframeTitle}
          />
        )}
      </p>
    </div>
  );
};

export default SidebarService;
