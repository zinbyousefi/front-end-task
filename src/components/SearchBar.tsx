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
  const [selectedDate, setSelectedDate] = useState<PersianDate | null>(
    date ? new PersianDate(date) : null
  );

  const debouncedSearch = useDebouncedCallback(
    (query: string, date: PersianDate | null) => {
      const params = new URLSearchParams();
      if (query) params.set("query", query);
      if (date) {
        const gregorianDate = date.convert(persian).toDate();
        params.set("date", gregorianDate.toISOString());
      }
      setSearchParams(params);
    },
    500
  );

  useEffect(() => {
    debouncedSearch(searchQuery, selectedDate);
  }, [searchQuery, selectedDate, debouncedSearch]);

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="border-r-4 font-bold border-cyan-500 px-2  w-1/6">
        
        فیلتر اطلاعات
      </div>
      <div className="flex gap-5">
        <input
          type="text"
          className="border-2 p-2 w-fit rounded-full border-cyan-400 focus:border-cyan-400
         focus:ring-2 focus:ring-cyan-200 outline-none transition-all duration-200"
          placeholder="کلمه مورد نظر ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div style={{ direction: "rtl" }}>
          <DatePicker
            style={{
              backgroundColor: "white",
              borderWidth: "2px",
              borderColor: "#22d3ee",
              height: "45px",
              borderRadius: "9999px",
              fontSize: "14px",
              padding: "20px 15px",
              width: "100%",
            }}
            placeholder="تاریخ انتشار ..."
            value={selectedDate}
            onChange={(date: PersianDate) => setSelectedDate(date)}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
