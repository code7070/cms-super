import { isLogin } from "../../helpers/util";

const UserInfo = () => {
  const login = isLogin();

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-10 border-4 border-gray-600 text-center">
      <p className="text-3xl text-gray-700 font-bold mb-5">SUPER Dashboard</p>
      <p className="text-xl text-gray-500 font-bold my-5">
        {login
          ? `Your login info: ${JSON.stringify(login)}`
          : `You're not login`}
      </p>
    </div>
  );
};

export default UserInfo;
