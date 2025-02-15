import React, { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataItem } from "../types/data-item";

const CardView = lazy(() => import("./CardView"));
const TableView = lazy(() => import("./TableView"));

const fetchData = async (query: string, date: string) => {
  if (Math.random() < 0.3) {
    console.log("Throwing random error...");
    throw new Error("خطای تصادفی در دریافت اخبار!");
  }

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
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["data", query, date],
    queryFn: () => fetchData(query, date),
    retry: 0,
    staleTime: 0, // Disable caching
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;

  if (error && !data) {
    return (
      <div className="text-center text-lg text-red-500 w-full justify-center flex flex-col items-center">
        <p>
          متأسفانه خطایی در دریافت اخبار رخ داده است. لطفاً دوباره تلاش کنید.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 bg-primary text-white px-4 py-2 rounded"
          aria-label="تلاش مجدد"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  const filteredData = data ?? [];

  if (filteredData.length === 0) {
    return (
      <p className="text-center text-lg text-primary w-full justify-center flex items-center">
        خبری یافت نشد
      </p>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="bg-yellow-100 p-4 mb-4 rounded">
          <p className="text-yellow-800">
            خطایی در به‌روزرسانی اخبار رخ داد. لطفاً دوباره تلاش کنید.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-2 bg-primary text-white px-4 py-2 rounded"
            aria-label="تلاش مجدد"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {/* Mobile view */}
      <div className="block lg:hidden">
        <Suspense fallback={<p>در حال بارگذاری...</p>}>
          <CardView data={filteredData} />
        </Suspense>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block">
        <Suspense fallback={<p>در حال بارگذاری...</p>}>
          <TableView data={filteredData} />
        </Suspense>
      </div>
    </div>
  );
};

export default DataList;
