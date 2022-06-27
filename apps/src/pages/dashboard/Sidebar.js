import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getFrameCmsId,
  getTimeNow,
  isFunction,
  removeCookie,
  sendFormPost,
} from "../../helpers/util";
import servicelist from "./servicelist";
import { IconDashboard, IconLogout, IconUser } from "./SidebarIcon";

const BadgeNotif = ({ count }) => (
  <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
    {count}
  </span>
);

const BadgePro = () => (
  <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
    Pro
  </span>
);

const menulist = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <IconDashboard />,
  },
  ...servicelist,
  {
    name: "Users Info",
    link: "/dashboard/user-info",
    icon: <IconUser />,
  },
  {
    name: "Sign Out",
    link: "sign-out",
    icon: <IconLogout />,
    onClick: () => {
      localStorage.removeItem("super-login");
      removeCookie("super-login");
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    },
  },
];

const MenuItem = ({ item, nowPath, service, loading, setLoading }) => {
  const navigate = useNavigate();

  const forceLogout = async () => {
    const now = getTimeNow();
    const target = getFrameCmsId();
    const el = document.getElementById(target);
    let res = "default";
    if (el) {
      const { iframe } = service;
      const form = { path: `${iframe}?timehook=${now}`, target };
      const remBody = { ...form, params: { deleteAuth: "deleteAuth" } };
      res = await sendFormPost(remBody);
    }
    return res;
  };

  const linkClick = async (e) => {
    console.log("Link Click Start...");
    if (isFunction(item.onClick)) item.onClick();
    else {
      setLoading(item.link);
      if (service && Object.keys(service).length > 0) {
        e.preventDefault();
        const logout = await forceLogout();
        console.log("Logout response: ", logout);
      }
      navigate(item.link);
      setLoading(false);
    }
  };

  return (
    <li
      key={item.link}
      className={`${loading ? "pointer-events-none opacity-50" : ""}`}
    >
      <Link
        to={{ pathname: item.link }}
        state={{ prev: nowPath }}
        onClick={linkClick}
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {item.icon}
        <span className="flex-1 ml-3 whitespace-nowrap">
          {loading === item.link ? "loading..." : item.name}
        </span>
        {item.isPro && <BadgePro />}
        {item.notification && <BadgeNotif count={item.notification} />}
      </Link>
    </li>
  );
};

const Sidebar = ({ service }) => {
  const [loading, setLoading] = useState(false);

  const { pathname: nowPath } = useLocation();

  return (
    <div className="flex-initial">
      <aside className="w-64" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-screen">
          <ul className="space-y-2">
            {menulist.map((item) => (
              <MenuItem
                key={item.link}
                item={item}
                nowPath={nowPath}
                service={service}
                loading={loading}
                setLoading={setLoading}
              />
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
