import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDateSevenDaysAgo } from "../libs";

const DateRange = () => {
  const sevenDaysAgo = getDateSevenDaysAgo();
  const [searchParams, setSearchParams] = useSearchParams();

  const [dateFrom, setDateFrom] = useState(() => {
    const df = searchParams.get("df");
    return df && new Date(df).getTime() <= new Date().getTime()
      ? df
      : sevenDaysAgo || new Date().toISOString().split("T")[0];
  });

  const [dateTo, setDateTo] = useState(() => {
    const dt = searchParams.get("dt");
    return dt && new Date(dt).getTime() >= new Date(dateFrom).getTime()
      ? dt
      : new Date().toISOString().split("T")[0];
  });

  useEffect(() => {
    setSearchParams({ df: dateFrom, dt: dateTo });
  }, [dateFrom, dateTo]);

  const handleFromChange = (e) => {
    const df = e.target.value;
    setDateTo(df);
    if (newDate(dt).getTime() < new Date(dateFrom).getTime()) {
      setDateFrom(df);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="dateForm"
        >
          Filter
        </label>

        <input
          className="inputStyles"
          type="date"
          name="dateForm"
          max={dateTo}
          value={dateFrom}
          onChange={handleFromChange}
        />
      </div>
      <div className="flex items-center gap-1">
        <label
          className="block text-sm mb-2 text-gray-700 dark:text-gray-400"
          htmlFor="dateTo"
        >
          To
        </label>
        <input
          className="inputStyles"
          type={"date"}
          name="dateFrom"
          min={dateFrom}
          value={dateTo}
          onChange={handleDateToChange}
        />
      </div>
    </div>
  );
};

export default DateRange;
