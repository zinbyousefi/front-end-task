import React, { useMemo, Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataItem } from "../types/data-item";

const CardView = lazy(() => import("./CardView"));
const TableView = lazy(() => import("./TableView"));

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
        <Suspense fallback={<p>Loading ...</p>}>
          <CardView data={filteredData} />
        </Suspense>
      </div>

      {/* desktop  */}
      <div className="hidden lg:block">
        <Suspense fallback={<p>Loading ...</p>}>
          <TableView data={filteredData} />
        </Suspense>
      </div>
    </div>
  );
};

export default DataList;
