import React from "react";

const TermConditional = (data) => {
  const term = data?.data;

  return (
    <ul id="form-id" className="md:max-w-2xl mx-5 md:mx-auto mt-5 md:space-y-5">
      <p className="font-bold text-xl">Terms conditional</p>
      <p>{term}</p>
      {/* {dataPrivary.map((item) => {
        return <li>{policy}</li>;
      })} */}
    </ul>
  );
};
export default TermConditional;
