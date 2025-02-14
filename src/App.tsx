import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DataList from "./components/DataList";

const App: React.FC = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const date = searchParams.get("date") || "";

  return (
    <div className="flex lg:flex-row flex-col gap-5 text-center w-full p-4">
      <SearchBar  />
      <DataList query={query} date={date} />
    </div>
  );
};

export default App;
