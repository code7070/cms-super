export const ContentWrapper = ({ children }) => {
  return (
    <div className="flex-1 break-words bg-gray-200 shadow h-screen max-h-screen overflow-auto">
      {children}
    </div>
  );
};
