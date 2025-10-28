"use client";

import { useEffect, useState } from "react";

export default function FlashMessage({
  label,
  type = "success",
  duration = 5000,
}) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const typeClasses = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`relative p-3 rounded-b-2xl mb-4 w-full font-semibold ${
        typeClasses[type] || typeClasses.success
      }`}
    >
      <div className="absolute top-0 right-0 w-full bg-gray-200 rounded-b-2xl overflow-hidden">
        <div
          className={`transition-all duration-50 ease-linear h-0.5 ${
            type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {label}
    </div>
  );
}
