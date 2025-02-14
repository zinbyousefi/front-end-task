import React, { useState, useEffect, memo, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import DatePicker from "react-multi-date-picker";
import PersianDate from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface SearchBarProps {
  onSearch?: (params: { query: string; date: string | null }) => void;
}

const SearchBar: React.FC<SearchBarProps> = memo(({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || ""
  );
  const [selectedDate, setSelectedDate] = useState<PersianDate | null>(null);

  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    const dateParam = searchParams.get("date");

    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
    }

    if (dateParam) {
      const newDate = new PersianDate({
        date: new Date(dateParam),
        calendar: persian,
      });
      if (
        !selectedDate ||
        selectedDate.toDate().toISOString() !== newDate.toDate().toISOString()
      ) {
        setSelectedDate(newDate);
      }
    } else if (selectedDate !== null) {
      setSelectedDate(null);
    }
  }, [searchParams]);

  const debouncedSearch = useDebouncedCallback(
    (query: string, date: PersianDate | null) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        if (params.get("query") !== query) params.set("query", query);
      } else {
        if (params.has("query")) params.delete("query");
      }

      if (date) {
        const formattedDate = date.toDate().toISOString().split("T")[0];
        if (params.get("date") !== formattedDate)
          params.set("date", formattedDate);
      } else {
        if (params.has("date")) params.delete("date");
      }

      setSearchParams(params, { replace: false });

      onSearch?.({
        query,
        date: date ? date.toDate().toISOString().split("T")[0] : null,
      });
    },
    800
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value, selectedDate);
  };

  const handleDateChange = (date: PersianDate | null) => {
    setSelectedDate(date);
    debouncedSearch(searchQuery, date);
  };

  const datePickerStyle = useMemo(
    () => ({
      backgroundColor: "white",
      borderWidth: "2px",
      borderColor: "#0ab2b3",
      height: "40px",
      borderRadius: "9999px",
      fontSize: "14px",
      padding: "20px 15px",
      width: "100%",
      color: "black",
    }),
    []
  );

  return (
    <div className="flex flex-col gap-4 py-5 bg-gray-100 h-fit rounded-lg p-5">
      <div className="border-r-4 font-bold text-lg whitespace-nowrap text-start px-2 border-secondary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        فیلتر اطلاعات
      </div>

      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-primary">
          جستجو
          <input
            type="text"
            className="border-2 p-2 px-5 text-black rounded-full border-primary focus:border-secondary focus:outline-none"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-2 text-primary">
          تاریخ
          <DatePicker
            style={datePickerStyle}
            value={selectedDate}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
        </label>
      </div>
    </div>
  );
});

export default SearchBar;
