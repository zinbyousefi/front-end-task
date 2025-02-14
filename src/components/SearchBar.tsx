import React, { useState, useEffect, memo, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // useNavigate اضافه شد
import { useDebouncedCallback } from "use-debounce";
import DatePicker from "react-multi-date-picker";
import PersianDate from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const SearchBar: React.FC = memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || ""
  );
  const [selectedDate, setSelectedDate] = useState<PersianDate | null>(null);

  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    const dateParam = searchParams.get("date");

    setSearchQuery(queryParam);

    if (dateParam) {
      const date = new Date(dateParam);
      setSelectedDate(new PersianDate({ date, calendar: persian }));
    } else {
      setSelectedDate(null);
    }
  }, [searchParams]);

  const debouncedSearch = useDebouncedCallback(
    (query: string, date: PersianDate | null) => {
      const params = new URLSearchParams();
      if (query) params.set("query", query);
      if (date) {
        const gregorianDate = date.toDate();
        params.set("date", gregorianDate.toISOString().split("T")[0]);
      }

      navigate(
        {
          pathname: window.location.pathname,
          search: params.toString(),
        },
        { replace: true }
      );
    },
    500
  );

  useEffect(() => {
    debouncedSearch(searchQuery, selectedDate);
  }, [searchQuery, selectedDate, debouncedSearch]);

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
      <div
        className="border-r-4 font-bold text-lg whitespace-nowrap text-start
       px-2 border-secondary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        فیلتر اطلاعات
      </div>

      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-primary">
          جستجو
          <input
            type="text"
            className="border-2 p-2 px-5 text-black rounded-full border-primary focus:border-secondary focus:outline-none "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-2 text-primary">
          تاریخ
          <DatePicker
            style={datePickerStyle}
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
  );
});

export default SearchBar;
