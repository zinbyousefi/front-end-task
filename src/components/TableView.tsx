import { DataItem } from "../types/data-item";

const TableView: React.FC<{ data: DataItem[] }> = ({ data }) => (
  <div className="overflow-y-auto max-h-[630px]">
    <table className="w-full border-collapse border border-cyan-200">
      <thead className="">
        <tr className="bg-cyan-700 text-white">
          <th className="border p-2 border-cyan-700 sticky top-0 bg-cyan-700">
            عنوان
          </th>
          <th className="border p-2 border-cyan-700 sticky top-0 bg-cyan-700">
            Lead
          </th>
          <th className="border p-2 border-cyan-700 sticky top-0 bg-cyan-700">
            محتوا
          </th>
          <th className="border p-2 border-cyan-700 sticky whitespace-nowrap top-0 bg-cyan-700">
            تاریخ انتشار
          </th>
          <th className="border p-2 border-cyan-700 sticky top-0 bg-cyan-700">
            خبرگزاری
          </th>
          <th className="border p-2 border-cyan-700 sticky top-0 bg-cyan-700">
            دسته‌بندی‌
          </th>
          <th className="border p-2 border-cyan-700 sticky top-0 bg-cyan-700">
            برچسب‌ها
          </th>
        </tr>
      </thead>
      <tbody className="bg-cyan-100">
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-cyan-50">
            {/* عنوان */}
            <td className="border p-2">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-900 hover:underline"
              >
                {item.title}
              </a>
            </td>

            {/* Lead */}
            <td className="border p-2 text-sm">
              {item.lead ? item.lead : "-"}
            </td>
            {/* content  */}
            <td className="border p-2 w-1/5">
              <div className="line-clamp-2 text-sm">{item.content || "-"}</div>
            </td>

            {/* تاریخ انتشار */}
            <td className="border p-2">
              <div className="bg-cyan-800 text-cyan-100 rounded-full p-1">
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
                      className="bg-cyan-800 text-cyan-200 text-xs px-2 py-1 rounded-full"
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
);

export default TableView;
