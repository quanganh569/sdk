import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React, { Fragment } from "react";

const ModalCustomize = ({
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
          onClose={() => {}}
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
export default ModalCustomize;
