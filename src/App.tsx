import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DataList from "./components/DataList";

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const dateParam = searchParams.get("date") || "";

  const [query, setQuery] = useState(queryParam);
  const [date, setDate] = useState(dateParam);

  useEffect(() => {
    setQuery(queryParam);
    setDate(dateParam);
  }, [queryParam, dateParam]);

  return (
    <div className="container flex lg:flex-row flex-col gap-5 text-center mx-auto p-4">
      <SearchBar query={query} date={date} setSearchParams={setSearchParams} />
      <DataList query={query} date={date} />
    </div>
  );
};

export default App;
