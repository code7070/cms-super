import Cookies from "js-cookie";

export const getCookie = (name) => {
  if (!name) return "";
  return Cookies.get(name);
};

export const setCookie = (name, value, expires = 1, path = "/", sameSite) => {
  return Cookies.set(name, value, {
    expires,
    path,
    secure: sameSite ? true : false,
    sameSite,
  });
};

export const removeCookie = (name) => Cookies.remove(name);

export const isLogin = () => {
  return getCookie("super-login");
};

export const isLocalLogin = () => {
  return localStorage.getItem("super-login");
};

export const sendFormPost = (
  { path, target, params, method = "post" },
  callback
) => {
  return new Promise((resolve, reject) => {
    const form = document.createElement("form");
    form.target = target;
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
    form.submit(callback);
    setTimeout(resolve, 500, "success");
  });
};

export const getTimeNow = () =>
  new Date().getTime() + Math.floor(Math.random() * 1000000);

export const getFrameCmsId = () => "superCmsFrame";

export const isFunction = (fn) => typeof fn === "function";
