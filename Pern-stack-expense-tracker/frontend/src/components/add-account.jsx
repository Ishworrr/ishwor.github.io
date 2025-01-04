import React, { useState } from "react";
import { generateAccountNumber } from "../libs";
import { useStore } from "../store";
import { api } from "../libs/apiCall";
import DialogWrapper from "./wrappers/dialog-wrapper";
import { DialogPanel } from "@headlessui/react";
import { MdOutlineWarning } from "react-icons/md";
import { Input} from "./ui/input";
import  Button  from "../button";

const accounts = ["Cash", "Crypto", "Paypal", "Visa Debit Card"];

export const AddAccount = ({ isOpen, setIsOpen, refetch }) => {
  const [account, setAccount] = React.useState("");
  const { user } = useStore((state) => state);
  const {
    register,
    handdleSubmit,
    formstate: { errors },
  } = useForm({ defaultValues: { account_number: generateAccountNumber() } });
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
        setLoading(true);
        const newData = {...data,name:selectedAccount}
        const {data:res} = await api.post(`/accounts/create`,newData)
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
          Add Account
        </DialogTitle>
        <form onSubmit={handdleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-1 mb-2">
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
              Select Account
            </p>
            <select
              onChange={(e) => selectedAccount(e.target.value)}
              className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3  text-gray-700 dark:text-gray-500 outline-none focus:ring-1 ring-blue-500 dark:placeholder:text-gray-700"
            >
              {accounts.map((account, index) => (
                <option
                  key={index}
                  value={acc}
                  className="w-full flex items-center justify-center dark:bg-slate-900"
                >
                  {acc}
                </option>
              ))}
            </select>
          </div>
          {user?.accounts?.includes(selectedAccount) && (
            <div className="flex items-center bg-yellow-400 text-black p-2 mt-6 rounded gap-2">
              <MdOutlineWarning size={30} />
              <span className="text-sm">
                This account has been activated alreay. Try another one. Thanks
              </span>
            </div>
          )}

          {user?.accounts?.includes(selectedAccount)&&(
            <>
            <Input 
            name="account_number"
            label="Account Number"
            placeholder="account_number"
       {...register("account number"),{
        required: "Account Number is needed"
       }}
       error={
        errors.account_number?errors.account_number.message:""
       }
       className="inputStyle "
            
            />
            <Input 
            type="number"
            name="amount"
            label="Initial amount"
            placeholder="10.56"
       {...register("amount"),{
        required: "Initial amount is needed"
       }}
       error={
        errors.amount?errors.amount.message:""
       }
       className="inputStyle "
            
            />

            <Button
            disabled={loading}
            type="submit"
            className=" bg-violet-700 text-white w-full mt-4"
            >
                {
                    loading ? (
                        <BiLoader className="text-xl animate-spin text-white" />
                    ):(
                        "Create Account"
                    )
                }
Create Account
            </Button>
            </>
          )}
        </form>
      </DialogPanel>
    </DialogWrapper>
  );
};

export default AddAccount;
