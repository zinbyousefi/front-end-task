import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const date = searchParams.get("date") || "";

  return (
    <div className="container mx-auto p-4">
      <SearchBar query={query} date={date} setSearchParams={setSearchParams} />
    </div>
  );
};

export default App;
