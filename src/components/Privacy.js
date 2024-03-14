import React from "react";

const PrivacyPolicy = (data) => {
  const policy = data.data;
  return (
    <div className="md:max-w-2xl mx-5 md:mx-auto mt-5 md:space-y-5 overflow-y-auto ">
      <h1 className="font-bold text-lg">
        Chính sách Bảo mật và quyền riêng tư
      </h1>
      <p>{policy}</p>
    </div>
  );
};

export default PrivacyPolicy;
