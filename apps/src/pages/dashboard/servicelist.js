import { IconImkas, IconSakumas } from "./SidebarIcon";

const servicelist = [
  {
    name: "GOLD",
    urlPage: "/dashboard/gold",
    link: "/dashboard/gold",
    iframe: "https://gold.wknd-otto.my.id",
    localFrame: "localhost:3031",
    iframeTitle: "Gold",
    iframeWidth: 1024,
    iframeHeight: 700,
    // notification: 3,
    isPro: "CMS",
    icon: <IconImkas />,
  },
  {
    name: "Insurance",
    urlPage: "/dashboard/insurance",
    link: "/dashboard/insurance",
    iframe: "https://tailwindcss.com/docs/screens",
    // iframe: "http://localhost:3031",
    iframeTitle: "Insurance",
    iframeWidth: 1024,
    iframeHeight: 700,
    isPro: "CMS",
    icon: <IconSakumas />,
  },
];

const getServiceMatching = (urlPage) => {
  if (!urlPage) return "";
  const match = servicelist.find((i) => i.urlPage === `/dashboard/${urlPage}`);
  return match;
};

export { getServiceMatching };
export default servicelist;
