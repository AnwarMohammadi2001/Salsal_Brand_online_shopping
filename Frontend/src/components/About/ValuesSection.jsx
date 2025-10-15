import React, { use, useRef, useState } from "react";

const ValuesSection = ({ service, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const divRef = useRef(null);
  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  return (
    <div
      className="relative overflow-hidden max-w-lg m-2 sm:-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-100 dark:shadow-white/10"
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
      ref={divRef}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`pointer-events-none blur-2xl rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 w-[300px] h-[300px] absolute z-0 transition-opacity duration-500 mix-blend-lighten ${
          visible ? "opacity-70" : "opacity-0"
        }`}
        style={{
          top: position.y - 150,
          left: position.x - 150,
        }}
      />
      <div className="flex items-center gap-10 p-8 hover:p-7.5 hover:m-0.5   transition-all rounded-[10px] bg-white dark:bg-gray-900 z-10 relative ">
        <div className="bg-gray-100 text-4xl p-2 h-14 w-14 flex items-center justify-center rounded-full">
          {service.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold">{service.title}</h3>
          <p className="text-sm mt-2">{service.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
