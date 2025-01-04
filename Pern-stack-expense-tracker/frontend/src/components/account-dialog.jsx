import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MdMoreVert } from "react-icons/md";
import TransitionWrapper from "./wrappers/transition-wrapper";
import { FaMoneyCheckDollar } from "react-icons/fa";

export default function AccountMenu({ addMoney, transferMoney }) {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex w-full justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 ">
          <MdMoreVert />
        </MenuButton>

        <TransitionWrapper>
          <MenuItems className="absolute p-2 right-0 mt-2w-40 origin-right divide-y divide-gray-100 rounded-md backdrop-white text-black">
            <div className="px-1 py-1 space-y-2">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={transferMoney}
                    className={`group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-500`}
                  >
                    <BiTransfer />
                    Transfer Funds
                  </button>
                )}
              </MenuItem>

              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={addMoney}
                    className={`group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-500`}
                  >
                    <FaMoneyCheckDollar />
                    Transfer Funds
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </TransitionWrapper>
      </Menu>
    </>
  );
}
