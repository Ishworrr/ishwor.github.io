import React, { useState, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";
import { BiCheck, BiLoader } from "react-icons/bi";

import useStore from "../store";
import { Button } from "./ui/button";
import { toast } from "sonner";

const SettingsForm = () => {
  const { user, theme, setTheme } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...user },
  });

  const [selectedCountry, setSelectedCountry] = useState(
    {
      country: user?.country,
      currency: user?.currency,
    } || ""
  );
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(false); // Fixed undefined state type
  const [query, setQuery] = useState("");

  const onSubmit = async (values) => {
    // Add logic here if needed
    try {
      const newData = {
        ...values,
        country: selectedCountry.country,
        currency: selectedCountry.currency,
      };
      // const { data: res } = await api.put(`/user/${user?.id}`, newData); //in userRoutes.js of backend--user(put)
      const { data: res } = await api.put(`/user`, newData);
      if (res?.user) {
        const newUser = { ...res, token: user.token };
        localStorage.setItem("user", JSON.stringify(newUser));

        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const toggleTheme = (val) => {
    setTheme(val);
    localStorage.setItem("theme", val);
  };

  const filteredCountries =
    query === ""
      ? countriesData
      : countriesData.filter((country) =>
          country.country
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const getcountriesList = async () => {
    const data = await fetchCountries();
    setCountriesData(data);
  };

  useEffect(() => {
    getcountriesList();
  });

  const Countries = () => {
    return (
      <div className="w-full">
        <Combobox value={selectedCountry} onChange={setSelectedCountry}>
          <div className="relative mt-1">
            <div className="relative">
              <ComboboxInput
                className="inputStyles"
                displayValue={(country) => country?.country}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronExpand className="text-gray-400" />
              </ComboboxButton>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900">
                {filteredCountries.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-500">
                    Nothing found
                  </div>
                ) : (
                  filteredCountries.map((country, index) => (
                    <ComboboxOption
                      key={country.country + index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-violet-600/20 text-white"
                            : "text-gray-900 dark:text-gray-100"
                        }`
                      }
                      value={country}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center gap-2">
                            <img
                              src={country?.flag}
                              alt={country.country}
                              className="w-8 h-5 rounded-sm object-cover"
                            />
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {country.country}
                            </span>
                          </div>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <BiCheck className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <Input
            disabled={loading}
            id="firstname"
            type="text"
            label="First Name"
            placeholder="John"
            // register={register("firstname", {
            //   required: "First Nmae is required",
            // })}
            {...register("firstname")}
            // error={errors.firstname ? errors.firstname.message : ""}
            error={errors.firstname.message}
            className="inputStyle"
          />
        </div>
        <div className="w-full">
          <Input
            disabled={loading}
            id="lastname"
            label="Last Name"
            type="text"
            placeholder="Doe"
            // register={register("lastName", {
            //   required: "Last Nmae is required",
            // })}
            {...register("lastname")}
            // error={errors.lastname ? errors.lastname.message : ""}
            error={errors.lastname.message}
            className="inputStyle"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <Input
            disabled={loading}
            id="email"
            type="Email"
            label="First Name"
            placeholder="John"
            // register={register("firstname", {
            //   required: "First Nmae is required",
            // })}
            {...register("email", {
              required: "Email is required",
            })}
            // error={errors.firstname ? errors.firstname.message : ""}
            error={errors.email?.message}
            className="inputStyle"
          />
        </div>
        <div className="w-full">
          <Input
            disabled={loading}
            id="contact"
            label="contact"
            type="number"
            placeholder="Contact"
            // register={register("lastName", {
            //   required: "Last Nmae is required",
            // })}
            {...register("contact", {
              required: "Contact is required",
            })}
            // error={errors.lastname ? errors.lastname.message : ""}
            error={errors.contact?.message}
            className="inputStyle"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <span className="labelStyles">Country</span>
          <Countries />
        </div>
        <div className="w-full">
          <span className="labelStyles">Currency</span>
          <select className="inputStyles">
            <option> {selectedCountry?.currency || user?.country}</option>
          </select>
        </div>
      </div>

      <div className="w-full felx items-center justify-betweenpt-10">
        <div className="">
          <p className="text-lg text-black dark:text-gray-400 font-semibold">
            Apperance
          </p>
          <span className="labelStyles">
            Customize how your theme looks on your device
          </span>
        </div>
        <div className="w-28 md:w-40">
          <select
            className="inputStyles"
            defaultValue={theme}
            onChange={(e) => toggleTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div className=" w-full flex items-center justify-between pb-10">
        <div>
          <p className="text-lg text-black dark:text-gray-400 font-semibold">
            Language
          </p>
          <span className="labelStyles">
            Choose your preferred language Customizw what language u want to use
          </span>
        </div>
        <div className="w-28 md:w-40">
          <select className="inputStyles" defaultValue={selectedLanguage}>
            <option value="English">English</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-6 justify-end pb-10 border-b-2 border-gray-200 dark:border-gray-800">
        <Button
          variant="outline"
          loading={loading}
          type="reset"
          className="px-6 bg-transparent text-black darl:text-white border border-gray-200 dark:border-gray-700"
        >
          Reset
        </Button>
        <Button
          loading={loading}
          type="submit"
          className="px-8 bg-violet text-white "
        >
          {loading ? <BiLoader className="animate-spin text-white" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
