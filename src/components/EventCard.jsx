import React from "react";

const colorClasses = {
  blue: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  red: "bg-gradient-to-r from-red-500 to-red-600 text-white",
  green: "bg-gradient-to-r from-green-500 to-green-600 text-white",
  purple: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
  orange: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
  indigo: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white",
  pink: "bg-gradient-to-r from-pink-500 to-pink-600 text-white",
};

export const EventCard = ({ event, onClick, isConflicted }) => {
  return (
    <div
      onClick={onClick}
      className={`text-xs p-1.5 rounded cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
        colorClasses[event.color] || colorClasses.blue
      } ${isConflicted ? "ring-2 ring-red-400 ring-opacity-60" : ""}`}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="text-xs opacity-90">{event.time}</div>
    </div>
  );
};
