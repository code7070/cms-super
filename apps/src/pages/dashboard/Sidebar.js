import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { isLogin, removeCookie } from "../../helpers/util";
import servicelist from "./servicelist";
import { IconDashboard, IconLogout, IconUser } from "./SidebarIcon";

const postCookie = (path, params = {}, method = "post") => {
  const form = document.createElement("form");
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
};

const sendCookiePla = () => {
  const cookieLogin = isLogin();
  postCookie("http://103.186.1.191", { superAuth: cookieLogin });
};

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
    link: "user-info",
    icon: <IconUser />,
  },
  {
    name: "Sign Out",
    link: "sign-out",
    icon: <IconLogout />,
    onClick: () => {
      localStorage.removeItem("super-login");
      removeCookie("super-login");
      window.location.href = "/";
    },
  },
];

const Sidebar = () => {
  const cookieLogin = isLogin();
  const navigate = useNavigate();

  const sends = (e) => {
    e.preventDefault();
    navigate("/dashboard/pla");
  };

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-screen">
        <ul className="space-y-2">
          {menulist.map((item) => (
            <li key={item.link}>
              <Link
                to={item.link}
                onClick={item.onClick}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {item.name}
                </span>
                {item.isPro && <BadgePro />}
                {item.notification && <BadgeNotif count={item.notification} />}
              </Link>
            </li>
          ))}
          {/* <li>
            <form method="post" action="http://103.186.1.191" onSubmit={sends}>
              <input type="hidden" name="superAuth" value={cookieLogin} />
              <button className="w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                POST COOKIE
              </button>
            </form>
          </li> */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
