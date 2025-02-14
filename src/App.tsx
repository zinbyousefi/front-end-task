import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DataList from "./components/DataList";


const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const date = searchParams.get("date") || "";


  const persianDate = date ? new Date(date).toLocaleDateString("fa-IR") : null;

  return (
    <div className="container flex lg:flex-row flex-col gap-5 text-center mx-auto p-4">
      <div className="flex flex-col gap-5">
        <SearchBar setSearchParams={setSearchParams} />
        <div className=" rounded-lg text-primary">
          {query && <p>جستجو برای: {query}</p>}
          {date && persianDate && (
            <p>تاریخ: {persianDate}</p> 
          )}
        </div>
      </div>
      <DataList query={query} date={date} />
    </div>
  );
};

export default App;
