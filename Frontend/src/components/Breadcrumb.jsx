// src/components/Breadcrumb.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

// Map English route segments to Dari labels
const segmentLabels = {
  product: "محصولات",
  shoes: "کفش‌ها",
  nike: "نایک",
  // Add more mappings as needed
};

const Breadcrumb = ({ separator = "/" }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Split path into segments
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 px-6 py-3" aria-label="breadcrumb">
      <ol className="flex items-center gap-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="hover:text-blue-600">
            خانه
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          // Use Dari label if exists, otherwise fallback to raw segment
          const segmentLabel = segmentLabels[segment] || segment;

          return (
            <React.Fragment key={path}>
              <li>{separator}</li>
              <li>
                {isLast ? (
                  <span className="text-gray-700">{segmentLabel}</span>
                ) : (
                  <Link to={path} className="hover:text-blue-600">
                    {segmentLabel}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
