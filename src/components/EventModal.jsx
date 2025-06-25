import React from "react";
import { X, Clock, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  red: "from-red-500 to-red-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  indigo: "from-indigo-500 to-indigo-600",
  pink: "from-pink-500 to-pink-600",
};

export const EventModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
    }
    return `${mins}m`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-2xl">
        <div
          className={`h-2 bg-gradient-to-r ${
            colorClasses[event.color] || colorClasses.blue
          } rounded-t-xl`}
        />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {event.time} ({formatDuration(event.duration)})
              </span>
            </div>
            {event.description && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Description
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 text-blue-700">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Event Details</span>
              </div>
              <div className="mt-2 text-sm text-blue-600">
                Duration: {formatDuration(event.duration)} • Category:{" "}
                {event.color}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
            >
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
