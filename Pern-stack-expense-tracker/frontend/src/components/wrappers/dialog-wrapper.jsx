import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, {Fragment} from "react";

const DialogWrapper=({isOpen, closeModal, children})=>{
    return (
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <TransitionChild
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        >
            <div className="fixed inset-0 bg-black/60"/>
            </TransitionChild>


    <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center">
            <TransitionChild
            as={Fragment}
            enter=" ease-out duration-100"
            enterFrom=" opacity-0 scale-95"
            enterTo=" opacity-100 scale-100"
            leave=" ease-in duration-75"
            leaveFrom=" opacity-100 scale-100"
            leaveTo=" opacity-0 scale-95"
            >
   {children}
            </TransitionChild>
        </div>
    </div>

</Dialog>
</Transition>

         
        )
        }

        export default DialogWrapper;