// CookieBanner.js

import axios from "axios";
import posthog from "posthog-js";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import ModalCustomize from "./common/ModalCustomize";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import Tab from "./common/TabSelect";
interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  optout: boolean;
  country: string;
  data_source: string;
  additional_data: null;
  ip_address: string;
  consentStatus: string;
  privacy_policy: boolean;
  terms_and_conditions: boolean;
}

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(true); // new

  const acceptCookies = () => {
    posthog.opt_in_capturing();
    setShowBanner(false); // new
    alert("Cho phép");
  };

  const declineCookies = () => {
    posthog.opt_out_capturing();
    setShowBanner(false); // new
    toast.success("Từ chối thu thập");
  };
  // GARENA APP
  const idApp = "153c499c-582f-456c-82da-4b60d22b9e2e";

  const [dymanicForm, setDynamicForm] = useState([] as any);
  const [apiPolicyTermData, setApiPolicyTermData] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dynamicResponse, policyTermResponse] = await Promise.all([
          axios.get(`https://api-cmp.5labs.io/apps/field/${idApp}`),
          axios.get(`https://api-cmp.5labs.io/apps/term-policy/${idApp}`),
        ]);

        // Set the data in state
        setDynamicForm(dynamicResponse.data);
        setApiPolicyTermData(policyTermResponse.data);
      } catch (error) {
        // Handle errors if any
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [idApp]);

  console.log(apiPolicyTermData, "apiPolicyTermData");
  const [activeTab, setActiveTab] = useState(0);
  const tabData = [
    // {
    //   name: "Settings",
    //   color: "#168F7C",
    // },
    {
      name: "Data request",
      color: "#168F7C",
    },
    {
      name: "Terms conditional",
      color: "#168F7C ",
    },
    {
      name: "Privacy policy",
      color: "#168F7C",
    },
  ];

  const settingsData = [
    // {
    //   name: "Status",
    //   key: "verified",
    // },
    // {
    //   name: "Opt Out ",
    //   key: "optout",
    // },
    {
      name: "Privacy Policy",
      key: "privacy_policy",
    },
    {
      name: "Term and conditions ",
      key: "terms_and_conditions",
    },
  ];

  const handleTabClick = (tabNumber: any) => {
    setActiveTab(tabNumber);
  };

  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setShowBanner(false);
  };
  const handleClose = () => {
    setOpen(false);
    setShowBanner(true);
  };

  const [formData, setFormData] = useState({});

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    try {
      const response = axios.put(
        `https://api-cmp.5labs.io/consent/create/${idApp}`,
        formData
      );
      // setValue("");
      // Assuming 'toast.success' comes from a library like react-toastify
      toast.success(
        "Gửi yêu cầu thành công, Vui lòng kiểm tra thư điện tử của bạn"
      );
      posthog.opt_in_capturing();
      setShowBanner(false); // new
      setOpen(false);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    } catch (error: any) {
      console.log(error, "error");
      // Assuming 'toast.error' comes from a library like react-toastify
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi"); // Provide a fallback message
    }
  };

  return (
    <div>
      {showBanner && ( // new
        <div
          id="informational-banner"
          tabIndex={-1}
          className="fixed px-40 py-10 space-x-10 bottom-0 start-0 z-50 flex flex-col justify-between w-full p-4 border-b border-gray-200 md:flex-row bg-[#168F7C] dark:bg-gray-700 dark:border-gray-600"
        >
          <div className="flex flex-row items-start  w-fill md:flex-col lg:items-end ">
            <div className="relative h-24 cursor-pointer lg:w-40 w-36">
              <span
                style={{
                  boxSizing: "border-box",
                  display: "block",
                  overflow: "hidden",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
              >
                <img
                  alt="logo"
                  // src={logo}
                  decoding="async"
                  data-nimg="fill"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    boxSizing: "border-box",
                    padding: 0,
                    border: "none",
                    margin: "auto",
                    display: "block",
                    width: 0,
                    height: 0,
                    minWidth: "100%",
                    maxWidth: "100%",
                    minHeight: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  sizes="100vw"
                />
              </span>
            </div>
          </div>

          <div className="mb-4 md:mb-0 md:me-4">
            <h3 className="mb-1 text-xl font-bold text-white dark:text-white">
              Chính sách ssbảo mật
            </h3>
            <p className="flex items-center text-sm font-normal text-white dark:text-gray-400 text-justify ">
              Chúng tôi tôn trọng quyền riêng tư của bạn và hướng tới trải
              nghiệm trang web tốt nhất tuân thủ PDPA của Việt Nam theo nghị
              định 13. Việc cho phép cookie <br /> mang lại trải nghiệm phù hợp,
              trong khi việc tắt chúng có thể làm giảm cá nhân hóa. Hãy thoải
              mái cập nhật sở thích của bạn bất cứ lúc nào. Sự đồng ý của bạn
              <br />
              vẫn có hiệu lực trong 12 tháng. Để biết thêm thông tin, vui lòng
              đọc Chính sách quyền riêng tư và Chính sách cookie của chúng tôi.
              Chúc bạn duyệt vui vẻ!
            </p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={handleClick}
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-transparent rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Customize
            </button>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={declineCookies}
            >
              Decline
            </button>
          </div>
        </div>
      )}
      <ModalCustomize
        isShow={isOpen}
        handleOpen={handleClick}
        handleClose={handleClose}
        valueModal={
          <>
            <div className="flex flex-row space-x-3 p-4 justify-items-center justify-content-between  mx-auto  ">
              {tabData.map((tab: any, index) => (
                <div className="">
                  <Tab
                    // countOfTab={tab.countOfTab}
                    // icon={tab.icon}
                    key={index}
                    nameTab={tab.name}
                    color={tab.color}
                    active={activeTab === index}
                    onClick={() => handleTabClick(index)}
                  />
                </div>
              ))}
            </div>
            <div>
              {activeTab === 0 && (
                <form
                  id="form-id"
                  className="md:max-w-2xl mx-5 md:mx-auto  md:space-y-5 flex flex-col"
                  onSubmit={onSubmit}
                >
                  <p className="text-center  text-xl font-bold">Consent Form</p>

                  {dymanicForm?.map((item: any) => {
                    return (
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 uppercase"
                          htmlFor="email"
                        >
                          {item.label}
                        </label>

                        <input
                          type={item.type}
                          name={item.value}
                          id={item.value}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    );
                  })}
                  <div className="mx-auto">
                    {" "}
                    <button
                      type="submit"
                      // value="Submit"
                      id="submit-btn"
                      className="bg-[#168F7C] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
              {activeTab === 1 && (
                <ul
                  id="form-id"
                  className="md:max-w-2xl mx-5 md:mx-auto mt-5 md:space-y-5"
                >
                  <p className="font-bold text-xl">Terms conditional</p>
                  <p>{apiPolicyTermData?.client_term}</p>
                </ul>
              )}
              {activeTab === 2 && (
                <div className="md:max-w-2xl mx-5 md:mx-auto mt-5 md:space-y-5 overflow-y-auto ">
                  <h1 className="font-bold text-lg">Privacy Psolicy</h1>
                  <p>{apiPolicyTermData?.client_policy}</p>
                </div>
              )}
            </div>
          </>
        }
      ></ModalCustomize>
    </div>
  );
};

export default CookieBanner;

type ModalProps = {
  titleModal?: string;
  className?: string;
  handleClose?: (event: any) => void;
  handleOpen?: (event: any) => void;
  valueModal?: JSX.Element;
  isShow?: boolean;
};
const ModalCustomize: React.FC<ModalProps> = ({
  isShow,
  handleOpen,
  handleClose,
  titleModal,
  valueModal,
}) => {
  return (
    <>
      <Transition appear show={isShow} as={Fragment}>
        <Dialog
          as="div"
          id="modal"
          className="fixed inset-0 z-10 overflow-y-auto"
          static
          onClose={() => {
            handleClose();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full flex flex-row max-w-screen-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <button className="ml-auto" onClick={handleClose}>
                      <XCircleIcon className="h-10 w-10 text-gray-500" />
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white "
                  >
                    {titleModal}
                  </Dialog.Title>

                  <div
                    className="inline-flex flex-col overflow-hidden w-full  mx-auto"
                    // style={{ maxHeight: "90vh" }}
                  >
                    {valueModal}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
