import React, { memo } from "react";
import { DataItem } from "../types/data-item";

const CardView: React.FC<{ data: DataItem[] }> = memo(({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {data.map((item) => (
      <div key={item.id} className=" bg-gray-100 p-4 px-9 rounded-lg shadow-md">
        {/* عنوان خبر */}
        {item.title && item.url ? (
          <h3 className="font-bold mb-2">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {item.title}
            </a>
          </h3>
        ) : (
          item.title && <h3 className="font-bold">{item.title}</h3>
        )}

        {/* لید خبر */}
        {item.lead && (
          <div className="mb-2 text-sm">
            <span className="text-gray-500">خلاصه:</span>

            <div
              className="text-gray-500"
              dangerouslySetInnerHTML={{ __html: item.lead }}
            />
          </div>
        )}

        {/* content */}
        {item.content && (
          <div className="line-clamp-2 text-sm mb-2">
            <span className="flex flex-col gap-4 text-gray-500">محتوا:</span>

            <div
              className="text-gray-500"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        )}

        {/* تاریخ انتشار */}
        {item.published_at && (
          <div className="w-full flex justify-end">
            <small className="bg-gradient-to-tr from-primary to-secondary text-white px-2 py-1 rounded-full w-fit">
              {new Date(item.published_at).toLocaleDateString("fa-IR")}
            </small>
          </div>
        )}

        {/* نام خبرگزاری */}
        {item.news_agency_name && (
          <span className="block text-sm text-gray-500">
            {item.news_agency_name}
          </span>
        )}

        {/* دسته‌بندی‌ها */}
        {item.categories && item.categories.length > 0 && (
          <div className="mt-2 text-sm text-gray-700">
            <strong>دسته‌بندی‌ها: </strong> {item.categories.join("، ")}
          </div>
        )}

        {/* برچسب‌ها */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-primary text-white text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
));

export default CardView;
