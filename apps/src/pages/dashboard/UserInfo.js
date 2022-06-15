import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLocalLogin, isLogin } from "../../helpers/util";

const UserInfo = () => {
  const [auth, setAuth] = useState("");

  const navigate = useNavigate();

  const login = isLogin();
  const localLogin = isLocalLogin();

  const onChangeAuth = (e) => setAuth(e.target.value || "");

  const move = () => navigate("/dashboard/pla");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT : ", e);
    console.log(e.target.input);
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-10 border-4 border-gray-600 text-center">
      <p className="text-3xl text-gray-700 font-bold mb-5">SUPER Dashboard</p>
      <p className="text-xl text-gray-500 font-bold my-5">
        {login
          ? `Your login info: ${JSON.stringify(login)}`
          : `You're not login`}
      </p>
      <p className="text-xl text-gray-500 font-bold my-5">
        {localLogin
          ? `Your local login: ${JSON.stringify(localLogin)}`
          : `You're not local login`}
      </p>
      <form method="post" action="http://103.186.1.191">
        <input
          type="text"
          name="superAuth"
          onChange={onChangeAuth}
          value={auth}
          placeholder="auth-token-here"
        />
        <button type="submit">GO!</button>
      </form>
    </div>
  );
};

export default UserInfo;
