// Tab.js

const Tab = ({ nameTab, active, onClick, color, icon, countOfTab }) => {
  const tabStyle = {
    backgroundColor: active ? color : "",
    // color: active ? color : 'gray-500',
  };

  return (
    <div className="md:max-w-2xl mx-5 md:mx-auto mt-5 md:space-y-5">
      <div
        className={`flex items-center justify-between border  rounded-md tab ${
          active ? "active" : ""
        } py-3 px-5`}
        style={tabStyle}
        onClick={onClick}
      >
        <div className="flex flex-col ">
          <p
            className={` text-[16px]  ${active ? "text-white" : "text-black"}`}
          >
            {nameTab}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tab;
