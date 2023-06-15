import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-dark-accent-2 opacity-75"></div>
        </div>
        <div className="inline-block align-middle bg-dark-primary rounded-lg text-center overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-dark-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col justify-center items-center h-full">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Congratulations! You Passed All Test Cases
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-dark-accent px-4 py-3 sm:px-6 flex justify-center">
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Complete Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
