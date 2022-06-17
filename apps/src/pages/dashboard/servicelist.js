import IconWknd, { IconImkas, IconSakumas } from "./SidebarIcon";

const servicelist = [
  {
    name: "PLA",
    urlPage: "pla",
    link: "pla",
    iframe: "https://pla.wknd-otto.my.id/",
    iframeTitle: "PLA",
    iframeWidth: 1024,
    iframeHeight: 700,
    notification: 3,
    icon: <IconImkas />,
  },
  {
    name: "Insurance",
    urlPage: "insurance",
    link: "insurance",
    iframe: "https://tailwindcss.com/docs/screens",
    // iframe: "http://localhost:3031",
    iframeTitle: "Insurance",
    iframeWidth: 1024,
    iframeHeight: 700,
    icon: <IconSakumas />,
  },
  {
    name: "GOLD",
    urlPage: "gold",
    link: "gold",
    iframe: "https://www.w3schools.com/js/js_validation.asp",
    iframeTitle: "Weekend",
    iframeWidth: 1024,
    iframeHeight: 700,
    isPro: true,
    icon: <IconWknd />,
  },
];

const serviceMatching = (urlPage) => {
  if (!urlPage) return "";
  const match = servicelist.filter((i) => i.urlPage === urlPage);
  return match;
};

export { serviceMatching };
export default servicelist;
