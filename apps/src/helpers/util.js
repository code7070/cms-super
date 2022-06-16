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

export const sendFormPost = (path, target, params, method = "post") => {
  const form = document.createElement("form");
  form.method = target;
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

  const btn = document.createElement("button");
  btn.type = "submit";
  form.appendChild(btn);

  document.body.appendChild(form);
  form.submit();
};
