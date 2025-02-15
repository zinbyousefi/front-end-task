import { memo } from "react";
import { DataItem } from "../types/data-item";

const TableView: React.FC<{ data: DataItem[] }> = memo(({ data }) => (
  <div className="overflow-y-auto max-h-[630px] overflow-hidden rounded-lg shadow-lg">
    <table className="w-full border-collapse border border-cyan-200  rounded-r-lg">
      <thead className="">
        <tr className="bg-cyan-700 text-white">
          <th className="border p-2  sticky top-0 bg-primary">عنوان</th>
          <th className="border p-2  sticky top-0 bg-primary">خلاصه</th>
          <th className="border p-2  sticky top-0  bg-primary">محتوا</th>
          <th className="border p-2  sticky whitespace-nowrap top-0 bg-primary">
            تاریخ انتشار
          </th>
          <th className="border p-2  sticky top-0 bg-primary">خبرگزاری</th>
          <th className="border p-2  sticky top-0 bg-primary">دسته‌بندی‌</th>
          <th className="border p-2  sticky top-0 bg-primary">برچسب‌ها</th>
        </tr>
      </thead>
      <tbody className="bg-gray-100">
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-white">
            {/* عنوان */}
            <td className="border p-2">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {item.title}
              </a>
            </td>

            {/* خلاصه */}
            <td className="border p-2 text-sm">
              <div dangerouslySetInnerHTML={{ __html: item.lead || "-" }} />
            </td>

            {/* محتوا  */}
            <td className="border p-2 w-1/5">
              <div
                className="line-clamp-2 text-sm"
                dangerouslySetInnerHTML={{ __html: item.content || "-" }}
              />
            </td>

            {/* تاریخ انتشار */}
            <td className="border p-2">
              <div className="bg-gradient-to-tr from-primary to-secondary text-white rounded-full p-1">
                {item.published_at
                  ? new Date(item.published_at).toLocaleDateString("fa-IR")
                  : "-"}
              </div>
            </td>

            {/* نام خبرگزاری */}
            <td className="border p-2 text-sm">
              {item.news_agency_name || "-"}
            </td>

            {/* دسته‌بندی‌ها */}
            <td className="border p-2 text-sm">
              {item.categories && item.categories.length > 0
                ? item.categories.join("، ")
                : "-"}
            </td>

            {/* برچسب‌ها */}
            <td className="border p-2">
              {item.tags && item.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary text-white text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                "-"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

export default TableView;
