import { useState } from "react";
import { useJwt } from "react-jwt";
import { ContentWrapper } from ".";
import { isLogin } from "../../helpers/util";
import DashboardContainer from "./DashboardContainer";

const UserInfo = () => {
  const [auth, setAuth] = useState("");

  const login = isLogin();

  const { decodedToken } = useJwt(login || false);

  const onChangeAuth = (e) => setAuth(e.target.value || "");

  return (
    <DashboardContainer>
      <ContentWrapper>
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-10 border-4 border-gray-600 text-center">
          <p className="text-3xl text-gray-700 font-bold mb-5">
            SUPER Dashboard
          </p>
          <p className="text-gray-500 text-l my-5">
            {login ? (
              <>
                <p>
                  <span className="font-bold">Your login token:</span>
                  <br />
                  {JSON.stringify(login)}
                </p>
                <p>
                  <span className="font-bold">Your login info:</span>
                  <br />
                  {JSON.stringify(decodedToken)}{" "}
                </p>
              </>
            ) : (
              `You're not login`
            )}
          </p>
          {/* <form method="post" action="http://103.186.1.191"> */}
          <input
            type="text"
            name="superAuth"
            onChange={onChangeAuth}
            value={auth}
            placeholder="auth-token-here"
          />
          <button type="submit">GO!</button>
          {/* </form> */}
        </div>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default UserInfo;
