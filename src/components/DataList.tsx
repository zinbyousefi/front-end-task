import { useQuery } from "@tanstack/react-query";
import CardView from "./CardView";
import TableView from "./TableView";
import { DataItem } from "../types/data-item";
import { useMemo } from "react";

const fetchData = async (query: string, date: string) => {
  const res = await fetch("/sample-data.json");
  const data: DataItem[] = await res.json();

  return data.filter((item) => {
    const isQueryMatch = item.title.toLowerCase().includes(query.toLowerCase());

    const isDateMatch = !date || item.published_at.startsWith(date);

    return isQueryMatch && isDateMatch;
  });
};

const DataList: React.FC<{ query: string; date: string }> = ({
  query,
  date,
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["data", query, date],
    queryFn: () => fetchData(query, date),
    placeholderData: (prevData) => prevData ?? [],
  });

  const filteredData = useMemo(() => data ?? [], [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (filteredData.length === 0)
    return (
      <p className="text-center text-lg text-primary w-full justify-center flex items-center">
        خبری یافت نشد
      </p>
    );

  return (
    <div>
      {/* mobile  */}
      <div className="block lg:hidden">
        <CardView data={filteredData} />
      </div>

      {/* desktop  */}
      <div className="hidden lg:block">
        <TableView data={filteredData} />
      </div>
    </div>
  );
};

export default DataList;