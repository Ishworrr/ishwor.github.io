import React, { useState } from "react";
import { api } from "../libs/apiCall";
import DialogWrapper from "./wrappers/dialog-wrapper";
import { DialogPanel, DialogTitle, Dialog } from "@headlessui/react";
import { formatCurrency } from "../libs";
import  Button  from "../button";
import { InputField } from "../textfield";
import { toast } from "sonner";

const accounts = ["Cash", "Crypto", "Paypal", "Visa Debit Card"];

export const AddMoney = ({ isOpen, setIsOpen,id, refetch }) => {

  const {
    register,
    handdleSubmit,
    formstate: { errors },
    watch
  } = useForm();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (data) => {
    try {
        setLoading(true);
        const {data:res} = await api.post(`/accounts/add-money/${id}`,data)
        if(res?.data){
            toast.success(res?.message)
            setIsOpen(false);
            refetch();
          
        }
    } catch (error) {
        toast.error(error?.response?.data?.message||error.message)
        console.error("Something went wrong:",error)

    }finally{
        setLoading(false);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }
  console.log(user);
  console.log(selectedAccount);

  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-white align-middle shadow-xl transition -all">
        <DialogTitle
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase"
        >
          Add Money To Account
        </DialogTitle>
        <form onSubmit={handdleSubmit(submitHandler)} className="space-y-6">
  
            <InputField 
            type="number"
            name="amount"
            label="Amount"
            placeholder="Amount/10.56"
       {...register("amount"),{
        required: "Amount is required"
       }}
       error={
        errors.amount?errors.amount.message:""
       }
       className="inputStyle "
            
            />
            <div className="w-full mt-8">
           
            <Button  
            disabled={loading}
            type="submit"
            className=" bg-violet-700 text-white w-full mt-4">
            label={`Submit ${
watch("amount")?formatCurrency(watch("amount")):""
            }`}
            </Button>

           
            </div>
       
   
        </form>
      </DialogPanel>
    </DialogWrapper>
  );
};

export default AddMoney;
