// src/components/CardView.tsx
import React from "react";
import { DataItem } from "../types/data-item";

const CardView: React.FC<{ data: DataItem[] }> = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {data.map((item) => (
      <div
        key={item.id}
        className="border bg-cyan-100 p-4 rounded-lg shadow-sm"
      >
        {/* عنوان خبر */}
        {item.title && item.url ? (
          <h3 className="font-bold">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {item.title}
            </a>
          </h3>
        ) : (
          item.title && <h3 className="font-bold">{item.title}</h3>
        )}

        {/* لید خبر */}
        {item.lead && <p className="mb-2">{item.lead}</p>}

        {/* content */}

        {item.content && (
          <div className="line-clamp-2">
            <span className="flex flex-col gap-4 text-gray-500">محتوا:</span>
            {item.content}
          </div>
        )}

        {/* تاریخ انتشار */}
        {item.published_at && (
          <small className="flex justify-end">
            {new Date(item.published_at).toLocaleDateString()}
          </small>
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
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default CardView;
