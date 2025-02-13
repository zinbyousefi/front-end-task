import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SearchBarProps {
  query: string;
  date: string;
  setSearchParams: (params: URLSearchParams) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  date,
  setSearchParams,
}) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    date ? new Date(date) : null
  );

  const debouncedSearch = useDebouncedCallback(
    (query: string, date: Date | null) => {
      const params = new URLSearchParams();
      if (query) params.set("query", query);
      if (date) params.set("date", date.toISOString());
      setSearchParams(params);
    },
    500
  );

  useEffect(() => {
    debouncedSearch(searchQuery, selectedDate);
  }, [searchQuery, selectedDate, debouncedSearch]);

  return (
    <div className="flex flex-col w-1/5 gap-4 p-5 font-bold">
      <div className="text-center rounded-full py-1 bg-cyan-600 text-white">فیلتر</div>
      <input
        type="text"
        className="border-2 p-2 rounded-full border-cyan-400 placeholder-cyan-400 focus:border-cyan-400
         focus:ring-2 focus:ring-cyan-200 outline-none transition-all duration-200"
        placeholder="کلمه مورد نظر را وارد کنید"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <DatePicker
        placeholderText="تاریخ انتشار را وارد کنید"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="border-2 p-2 w-full rounded-full border-cyan-400 placeholder-cyan-400 focus:border-cyan-400
         focus:ring-2 focus:ring-cyan-200 outline-none transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;
