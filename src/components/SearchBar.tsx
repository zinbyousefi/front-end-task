import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import DatePicker from "react-multi-date-picker";
import PersianDate from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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
  const [selectedDate, setSelectedDate] = useState<PersianDate | null>(null);

  useEffect(() => {
    if (date) {
      const gregorianDate = new Date(date);
      const persianDate = new PersianDate(gregorianDate);
      setSelectedDate(persianDate);
    }
  }, [date]);

  const debouncedSearch = useDebouncedCallback(
    (query: string, date: PersianDate | null) => {
      const params = new URLSearchParams();
      if (query) params.set("query", query);

      if (date) {
        const gregorianDate = date.toDate();
        params.set("date", gregorianDate.toISOString().split("T")[0]);
      }
      setSearchParams(params);
    },
    500
  );

  useEffect(() => {
    debouncedSearch(searchQuery, selectedDate);
  }, [searchQuery, selectedDate, debouncedSearch]);

  return (
    <div className="flex flex-col gap-4 py-5 bg-cyan-100 h-fit rounded-lg p-5">
      <div className="border-r-4 font-bold whitespace-nowrap border-cyan-500 px-2 w-1/6">
        فیلتر اطلاعات
      </div>
      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-cyan-900">
          جستجو
          <input
            type="text"
            className="border-2 p-2 text-white rounded-full border-cyan-400 bg-cyan-700 focus:border-cyan-400
         focus:ring-2 focus:ring-cyan-200 outline-none transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>

        <div style={{ direction: "rtl" }}>
          <label className="flex flex-col gap-2 text-cyan-900">
            تاریخ
            <DatePicker
              style={{
                backgroundColor: "#0e7490",
                borderWidth: "2px",
                borderColor: "#22d3ee",
                height: "40px",
                borderRadius: "9999px",
                fontSize: "14px",
                padding: "20px 15px",
                width: "100%",
                color: "white",
              }}
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
