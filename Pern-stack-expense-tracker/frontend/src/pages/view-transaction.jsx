import React, { useEffect, useState } from "react";
import { PiSealCheckFill } from "react-icons/pi";
import { DialogPanel, DialogTitle } from "@headlessui/react";

import DialogWrapper from "../wrapper/dialog-wraper";
import { formatCurrency } from "../libs";

const viewTransactions = ({ data, isOpen, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }
  const longDateString = new Date(data?.crearedat).toLocaleDateString("en-US", {
    year: "numeric",
    dateStyle: "full",
  });
  const longTimeString = new Date(data?.crearedat).toLocaleTimeString("en-US");

  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-white align-middle shadow-xl text-2xl transition-all">
        <DialogTitle
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase"
        >
          Transaction Detail
        </DialogTitle>
        <div className="space-y-3">
          <div className="w-full flex items-center gap-2 text-gray-600 dark:text-gray-500 border-y border-gray-300 dark:border-gray-300 justify-between pt-10">
            <p>{data?.description}</p>
            <span className="text-gray-600 text-xs">
              {longDateString} {longTimeString}
            </span>
          </div>
        </div>
        <div className="mb-10">
          <p className="text-xl text-black dark:text-gray-500 border-y ">
            {data?.description}
            <span className="text-gray-600 text-xs">
              {longDateString} {longTimeString}
            </span>
          </p>
        </div>
        <div className="mt-10 mb-3 flex items-center justify-between">
          <p className=" text-black dark:text-gray-400 text-2xl font-bold">
            <span
              className={`${
                data?.type === "income" ? "text-emerald-600" : "text-red-600"
              } font-bold mgl-1`}
            >
              {data?.type === "income" ? "+" : "-"}
            </span>
            {formatCurrency(data?.amount)}
          </p>
          <button
            type="button"
            className="rounded-md outline-none bg-violet-800 px-4 py-2 text-sm font-medium text-white"
            onClick={closeModal}
          >
            Got it, thanks
          </button>
        </div>
      </DialogPanel>
    </DialogWrapper>
  );
};

export default Transactions;
