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
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        className="border p-2"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="border p-2"
      />
    </div>
  );
};

export default SearchBar;
