import React, { useEffect } from "react";
import { FaBtc, FaPaypal } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { RiVisaLine } from "react-icons/ri";
import { MdAdd, MdVerifiedUser } from "react-icons/md";
import { toast } from "sonner";
import { useStore } from "zustand";
import Loading from "../components/loading";
import Title from "../components/title";
import { formatCurrency } from "../libs";
import AccountMenu from "../components/account-dialog";
import AddAccount from "../components/add-account";
import AddMoney from "../components/add-money-account";

const ICONS = {
  crypto: (
    <div className="w-12 h-12 bg-amber-600 text-white flex items-center justify-center rounded-full">
      <FaBtc size={26} />
    </div>
  ),
  cash: (
    <div className="w-12 h-12 bg-rose-600 text-white flex items-center justify-center rounded-full">
      <GiCash size={26} />
    </div>
  ),
  "visa debit card": (
    <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full">
      <RiVisaLine size={26} />
    </div>
  ),
  paypal: (
    <div className="w-12 h-12 bg-blue-700 text-white flex items-center justify-center rounded-full">
      <FaPaypal size={26} />
    </div>
  ),
};
const Accountpage = () => {
  const { user } = useStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isOpenTopup, setIsOpenTopup] = useState(false);
  const [isOpenTransfer, setIsOpenTransfer] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccounts = async () => {
    try {
      const { data: res } = await api.get("/account");
      setData(res?.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.messsage);
      if (error?.response?.data?.status === "auth_failed") {
        localStorage.removeItem("user");
        // window.location.href="/login"
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAddmoeny = (el) => {
    setIsOpenTopup(true);
    setSelectedAccount(el?.id);
  };
  const handleTransferMoney = (el) => {
    setIsOpenTransfer(true);
    setSelectedAccount(el?.id);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchAccounts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full py-10">
        <div className="flex items-center justify-center">
          <Title title="Accounts Information" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="py-1.5 px-2 rounded bg-black dark:bg-violet-600 text-white dark:text-white flex items-center justify-center"
            >
              <MdAdd size={16} />
              <span className="">Add</span>
            </button>
          </div>
        </div>

        {data?.length == 0 ? (
          <>
            <div className="w-full flex items-center justify-center py-10 text-gray-600 darK:text-gray-700 text-lg">
              <span>No account found</span>
            </div>
          </>
        ) : (
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 py-10 gap-6 ">
            {data?.map((acc, index) => (
              <div
                key={index}
                className="w-full h-48 flex gap-4 bg:gray-50 dark:bg-slate-800 p-3 rounded shadow"
              >
                <div className="">
                  {ICONS[acc?.account_name?.toLowerCase()]}
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center">
                      <p className="text-black dark:text-white text-2xl font-bold ">
                        {acc?.account_name}
                      </p>
                      <MdVerifiedUser
                        size={26}
                        className="ml-1 text-emerald-600 "
                      />
                      <AccountMenu
                        addMoney={() => handleOpenAddMoney(acc)}
                        transferMoney={() => handleTransferMoney(acc)}
                        size={26}
                        className="ml-2 text-green-500 dark:text-green-500"
                      />
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-light leading-loose ">
                      {maskAccountNumber(acc?.account_number)}
                    </span>

                    <p className="text-xs text-gray-600 dark:text-gray-500">
                      {new Date(acc?.createdat).toLocaleDateString("en-US", {
                        dateStyle: "full",
                      })}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-gray-600 dark:text-gray-500 text-sm">
                        {formatCurrency(acc?.account_balance)}
                      </p>
                      <button
                        onClick={() => handleOpenAddMoney(acc)}
                        className="text-violet-600 text-sm outline-none hover:underline"
                      >
                        AddMoney
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddAccount
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetch={fetchAccounts}
        key={(new Date(), getTime())}
      />
      <AddMoney
        isOpen={isOpenTopup}
        setIsOpen={setIsOpenTopup}
        refetch={fetchAccounts}
        key={(new Date(), getTime() + 1)}
      />
      <TransferMoney
        isOpen={isOpenTransfer}
        setIsOpen={setIsOpenTransfer}
        refetch={fetchAccounts}
        key={(new Date(), getTime() + 2)}
      />
    </>
  );
};

export default Accountpage;
