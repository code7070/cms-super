import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { isLogin, setCookie } from "../../helpers/util";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const login = isLogin();
  const navigate = useNavigate();

  const toDashboard = () => navigate("/dashboard", { replace: true });

  const clickLogin = () => {
    if (login) return toDashboard();
    setLoading(true);
    const jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IndrbmQ4ODgiLCJuYW1lIjoiQWRpdHlhIFByYXRhbWEgTnVyIiwiaWF0IjoxNjU1MTI2NzE0OTI5fQ.ZK8C1jOmrPiQ3x4X7w3VvEvrDjd5WfpxPafW4aQMFGs";
    setCookie("super-login", jwt, 1, "/", "None");
    localStorage.setItem("super-login", jwt);
    setTimeout(() => {
      setLoading(false);
      toDashboard();
    }, 2000);
  };

  let ctaView = <Button text="Login Here" onClick={clickLogin} />;
  if (loading) ctaView = "Loading...";

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-20">
      <p className="text-3xl text-gray-700 font-bold mb-5 text-center">
        SUPER Homepage
      </p>
      <p className="text-gray-500 text-lg text-center">
        <p>Please Login</p>
        {ctaView}
      </p>
    </div>
  );
};

export default Home;
