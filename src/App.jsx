import React, { useState } from "react";
import { Calendar } from "./components/calendar";
import { EventModal } from "./components/Eventmodal";

const staticEvents = [
  {
    id: "1",
    title: "Team Meeting",
    date: "2024-12-20",
    time: "10:00",
    duration: 60,
    color: "blue",
    description: "Weekly team sync meeting",
  },
  {
    id: "2",
    title: "Project Deadline",
    date: "2024-12-22",
    time: "23:59",
    duration: 30,
    color: "red",
    description: "Final project submission",
  },
  // Additional events...
];

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Smart Calendar
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your events with style and efficiency
          </p>
        </div>
        <Calendar events={staticEvents} onEventClick={handleEventClick} />
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default App;
