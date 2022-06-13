import { Link } from "react-router-dom";
import { removeCookie } from "../../helpers/util";
import IconWknd, {
  IconDashboard,
  IconImkas,
  IconLogout,
  IconSakumas,
  IconUser,
} from "./SidebarIcon";

const BadgeNotif = ({ count }) => (
  <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
    {count}
  </span>
);

const BadgePro = () => (
  <span class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
    Pro
  </span>
);

const serviceList = [
  {
    name: "WKND - CMS",
    link: "wknd-cms",
    isPro: true,
    icon: <IconWknd />,
  },
  {
    name: "IMKas",
    link: "imkas",
    notification: 3,
    icon: <IconImkas />,
  },
  {
    name: "SakuMas",
    link: "sakumas",
    icon: <IconSakumas />,
  },
];

const menulist = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <IconDashboard />,
  },
  ...serviceList,
  {
    name: "Users Info",
    link: "user-info",
    icon: <IconUser />,
  },
  {
    name: "Sign Out",
    link: "sign-out",
    icon: <IconLogout />,
    onClick: () => {
      removeCookie("super-login");
      window.location.href = "/";
    },
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-screen">
        <ul className="space-y-2">
          {menulist.map((item) => (
            <li key={item.link}>
              <Link to={item.link}>
                <Link
                  to={item.link}
                  onClick={item.onClick}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {item.icon}
                  <span class="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
                  {item.isPro && <BadgePro />}
                  {item.notification && (
                    <BadgeNotif count={item.notification} />
                  )}
                </Link>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
