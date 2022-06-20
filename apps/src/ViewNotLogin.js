const ViewNotLogin = ({ login }) => {
  return (
    <p className="text-xl text-gray-500 font-bold my-5">
      {login ? `Your login info: ${JSON.stringify(login)}` : `You're not login`}
    </p>
  );
};

export default ViewNotLogin;
