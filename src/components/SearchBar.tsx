import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import DatePicker from "react-multi-date-picker";
import PersianDate from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface SearchBarProps {
  setSearchParams: (params: URLSearchParams) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchParams }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<PersianDate | null>(null);

  const debouncedSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedDate)
      params.set("date", selectedDate.toDate().toISOString().split("T")[0]);

    setSearchParams(params);

    // پاک کردن مقدار اینپوت‌ها بعد از اعمال جستجو
    setSearchQuery("");
    setSelectedDate(null);
  }, 700);

  return (
    <div className="flex flex-col gap-4 py-5 bg-gray-100 h-fit rounded-lg p-5">
      <div className="border-r-4 font-bold text-lg whitespace-nowrap text-start px-2 border-secondary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        فیلتر اطلاعات
      </div>

      <div className="flex flex-col gap-5">
        {/* 🔹 اینپوت جستجو */}
        <label className="flex flex-col gap-2 text-primary">
          جستجو
          <input
            type="text"
            className="border-2 p-2 text-black rounded-full border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={debouncedSearch}
          />
        </label>

        {/* 🔹 انتخاب تاریخ */}
        <div style={{ direction: "rtl" }}>
          <label className="flex flex-col gap-2 text-primary">
            تاریخ
            <DatePicker
              style={{
                backgroundColor: "white",
                borderWidth: "2px",
                borderColor: "#0ab2b3",
                height: "40px",
                borderRadius: "9999px",
                fontSize: "14px",
                padding: "20px 15px",
                width: "100%",
                color: "black",
              }}
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                debouncedSearch();
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
