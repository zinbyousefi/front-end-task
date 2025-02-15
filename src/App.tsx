import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DataList from "./components/DataList";

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const date = searchParams.get("date") || "";

  const handleSearch = (params: { query: string; date: string | null }) => {
    const newParams = new URLSearchParams(searchParams);

    const prevQuery = newParams.get("query") || "";
    const prevDate = newParams.get("date") || "";

    if (params.query !== prevQuery || params.date !== prevDate) {
      if (params.query) {
        newParams.set("query", params.query);
      } else {
        newParams.delete("query");
      }

      if (params.date) {
        newParams.set("date", params.date);
      } else {
        newParams.delete("date");
      }

      setSearchParams(newParams, { replace: true });
    }
  };

  return (
    <div className="flex lg:flex-row flex-col gap-5 text-center w-full p-4">
      <SearchBar onSearch={handleSearch} />
      <DataList query={query} date={date} />
    </div>
  );
};

export default App;
