import React from "react";
// import {BsCashCoin,BsCurrencyDollar} from "react-icon/bs";
// import { SiCashapp } from "react-icon/si";
import { formatCurrency } from "../libs";
import { Card } from "./ui/card";
import { BsCashCoin, BsCurrencyDollar } from "react-icons/bs";

const ICON_STYLES = [
  "bg-blue-300 text-blue-800",
  "bg-emerald-300 text-emerald-800",
  "bg-rose-300 text-rose-800",
];

const Stats = ({ dt }) => {
  const data = [
    {
      label: "Total Balance",
      amount: dt?.balance,
      increase: 10.9,
      icons: <BsCurrencyDollar size={26} />,
    },
    {
      label: "Total Income",
      amount: dt?.income,
      increase: 8.9,
      icons: <BsCashCoin size={26} />,
    },
    {
      label: "Total Expense",
      amount: dt?.expense,
      increase: 10.9,
      icons: <SiCashapp size={26} />,
    },
  ];

  const ItemCard = ({ item, index }) => {
    return (
      <Card className="gap-5 h-48 w-full justify-between flex items-center py-12 px-4 shadow-lg 2xl:min-w-96 2xl:px-8 dark:border-spacing-0">
        <div className="flex items-center w-full h-full gap-4">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${ICON_STYLES[index]}`}
          >
            {item.icons}
          </div>
          <div className="space-y-3">
            <span className="text-base text-gray-600 dark:text-gray-400 md:text-lg">
              {item.label}
            </span>
            <p className="text-2xl font-medium text-black 2xl:text-3xl dark:text-gray-400">
              {formatCurrency(item?.amount || 0.0)}
            </p>
            <span className="text-xs text-gray-600 md:text-sm 2xl:text-bade dark:text-gray-500">
              Overall{item.label}
            </span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between gap-8 mb-20 md:flex-row 2xl:gap-x-40">
      <div className="flex flex-col items-center justify-between w--full gap-10 md:flex-row 2xl:gap-20">
        {data?.map((item, index) => {
          <ItemCard key={index} item={item} index={index} />;
        })}
      </div>
    </div>
  );
};
export default Stats;
