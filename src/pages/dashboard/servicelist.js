const servicelist = [
  {
    name: "Saku Mas",
    urlPage: "sakumas",
    iframe: "https://www.youtube.com/embed/Y5VFQx9EQWo",
    iframeTitle: "YouTube video player",
  },
  {
    name: "IMKas",
    urlPage: "imkas",
    iframe: "https://cms-imkas.web.app/",
    iframeTitle: "IMKas",
    iframeWidth: 1024,
    iframeHeight: 700,
  },
];

const serviceMatching = (urlPage) => {
  if (!urlPage) return "";
  const match = servicelist.filter((i) => i.urlPage === urlPage);
  return match;
};

export { serviceMatching };
export default servicelist;
