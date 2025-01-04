import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import api from "../libs/apiCall";
import Loading from "../components/loading";
import Title from "../components/title";
import { MdAdd } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { RiProgress3Line } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";
import { IoCheckmarkDoneCircle, IoSearchOutline } from "react-icons/io5";
import { exportToExcel } from "react-json-to-excel";
import DateRange from "../components/date-range";
import { formatCurrency } from "../libs";
import AddTransaction from "../components/add-transaction";

const Transactions = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const startDate = searchParams.get("df") || "";
  const endDate = searchParams.get("dt  ") || "";

  const handleViewTransaction = (el) => {
    setSelected(el);
    setIsOpenView(true);
  };
  const fetchTransactions = async () => {
    try {
      const URL = `/transaction?df=${startDate}&dt=${endDate}&s=${search}`;
      const { data: res } = await api.get(URL);
      setData(res?.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong.Try again later"
      );
      if (error?.response?.data?.status === "auth_failed") {
        localStorage.removeItem("user");
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchParams({
      df: startDate,
      dt: endDate,
    });
    setIsLoading(true);
    await fetchTransactions();

    useEffect(() => {
      setIsLoading(true);
      fetchTransactions();
    }, [startDate, endDate]);

    if (isLoading) return <Loading />;
  };

  return (
    <>
      <div className="w-full py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <Title title="Transaction Activity" />
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <DateRange />
            <form onSubmit={(e) => handleSearch(e)}>
              <div className="w-full items-center border-gray-300 dark:border-gray-600 rounded-md px-2 py-2">
                <IoSearchOutline className="text-xl text-gray-600 dark:text-gray-500 " />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search now..."
                  className=" text-gray-700 dark:text-gray-400 placeholder:text-gray-600 outline-none group bg-transparent:"
                ></input>
              </div>
            </form>

            <button
              onClick={() => setIsOpen}
              className="bg-black dark:bg-violet-800 flex justify-center gap-2 py-1.5 px-2 rounded text-white items-center "
            >
              <MdAdd size={22} />
              <span>pay</span>
            </button>
            <button
              onClick={() =>
                exportToExcel(data, `Transaction ${startDate}-${endDate}`)
              }
              className="text-black dark:text-gray-300 flex justify-center gap-2 items-center "
            >
              Export
              <CiExport size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-5">
          {data?.length === 0 ? (
            <div className="w-full flex text-lg items-center justify-between text-gray-600 dark:text-gray-700 py-10">
              <span>No transaction history found</span>
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead className="w-full border-b dark:border-gray-700 border-gray-300 ">
                  <tr className="w-full text-black dark:text-gray-400 text-left">
                    <th className="py-2">Date</th>
                    <th className="py-2 px-2">Description</th>
                    <th className="py-2 px-2">Status</th>
                    <th className="py-2 px-2">Source</th>
                    <th className="py-2 px-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr
                      key={index}
                      className="w-full border-b dark:border-gray-700 border-gray-200 dark:text-gray-500 text-gray-600 hover:bg-gray-300/10 text-sm md:text-base"
                    >
                      <td className="py-2">
                        <div className="flex flex-col w-56 md:w-auto">
                          <p className="w-24 md:w-auto">
                            {new Date(item.crearedat).toDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          {item.status === "Pending" && (
                            <RiProgress3Line
                              size={24}
                              className="text-amber-600"
                            />
                          )}
                          {item.status === "Completed" && (
                            <IoCheckmarkDoneCircle
                              size={24}
                              className="text-emerald-600"
                            />
                          )}
                          {item.status === "Rejected" && (
                            <TiWarning size={24} className="text-red-600" />
                          )}
                          <span>{item?.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">{item?.source}</td>
                      <td className="py-4 text-black dark:text-gray-400 text-base font-medium">
                        {item?.source}
                        <span
                          className={`${
                            item?.type === "income"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }text-lg font-bold mgl-1`}
                        >
                          {item?.type === "income" ? "+" : "-"}
                        </span>
                        {formatCurrency(item?.amount)}
                      </td>
                      <td className="py-4 px-2">
                        <button
                          onClick={() => handleViewTransaction(item)}
                          className="outline-none hover:underline text-violet-600 "
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <AddTransaction
        data={selected}
        isOpen={isOpenView}
        setIsOpen={setIsOpenView}
        key={new Date().getTime()}
      />
      <ViewTransaction
        data={selected}
        isOpen={isOpenView}
        setIsOpen={setIsOpenView}
      />
    </>
  );
};

export default Transactions;
