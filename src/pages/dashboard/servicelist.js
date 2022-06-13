const servicelist = [
  {
    name: "Saku Mas",
    urlPage: "sakumas",
    iframe: "https://www.w3schools.com",
  },
  {
    name: "IMKas",
    urlPage: "imkas",
    iframe: "https://indosatooredoo.com/portal/id/psdcimkaslanding",
  },
];

const serviceMatching = (urlPage) => {
  if (!urlPage) return "";
  const match = servicelist.filter((i) => i.urlPage === urlPage);
  return match;
};

export { serviceMatching };
export default servicelist;
