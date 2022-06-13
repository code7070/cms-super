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
    iframe: "https://www.w3schools.com/",
    iframeTitle: "IMKas",
  },
];

const serviceMatching = (urlPage) => {
  if (!urlPage) return "";
  const match = servicelist.filter((i) => i.urlPage === urlPage);
  return match;
};

export { serviceMatching };
export default servicelist;
