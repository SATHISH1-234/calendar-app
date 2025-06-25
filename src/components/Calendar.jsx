import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarIcon, Plus } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { EventCard } from "./Eventcard";
import { DatePicker, Modal, Input, TimePicker, Select } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";

export const Calendar = ({ events, onEventClick, onAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: "09:00",
    duration: 60,
    color: "blue",
    description: "",
  });
  const [pickerValue, setPickerValue] = useState(null);
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      direction === "prev"
        ? newDate.setMonth(prev.getMonth() - 1)
        : newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => event.date === date);
  };

  const hasConflicts = (dateEvents) => {
    if (dateEvents.length <= 1) return false;
    const sortedEvents = [...dateEvents].sort((a, b) =>
      a.time.localeCompare(b.time)
    );
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      const currentEndTime = addMinutes(
        sortedEvents[i].time,
        sortedEvents[i].duration
      );
      if (currentEndTime > sortedEvents[i + 1].time) {
        return true;
      }
    }
    return false;
  };

  const addMinutes = (time, minutes) => {
    const [hours, mins] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMins
      .toString()
      .padStart(2, "0")}`;
  };

  const renderCalendarDays = () => {
    const days = [];

    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div
          key={`prev-${day}`}
          className="min-h-[120px] p-1 text-gray-400 bg-gray-50/50"
        >
          <div className="text-sm font-medium mb-1">{day}</div>
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const dayEvents = getEventsForDate(dateStr);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;
      const conflicts = hasConflicts(dayEvents);

      days.push(
        <div
          key={day}
          className={`min-h-[120px] p-1 border border-gray-200 bg-white hover:bg-gray-50 transition-colors ${
            isToday
              ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300"
              : ""
          }`}
        >
          <div
            className={`text-sm font-medium mb-1 flex items-center justify-between ${
              isToday ? "text-blue-600" : "text-gray-900"
            }`}
          >
            <span
              className={
                isToday
                  ? "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  : ""
              }
            >
              {day}
            </span>
            {conflicts && (
              <div
                className="w-2 h-2 bg-red-500 rounded-full"
                title="Schedule conflicts detected"
              />
            )}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onEventClick(event)}
                isConflicted={conflicts}
              />
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 font-medium">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    const totalCells = Math.ceil((firstDayWeekday + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDayWeekday + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="min-h-[120px] p-1 text-gray-400 bg-gray-50/50"
        >
          <div className="text-sm font-medium mb-1">{day}</div>
        </div>
      );
    }

    return days;
  };

  const handleDatePickerChange = (date) => {
    if (date) {
      setCurrentDate(date.toDate());
    }
    setPickerValue(date);
  };

  const openCreateModal = (dateStr) => {
    setNewEvent({
      ...newEvent,
      date: dateStr || dayjs(currentDate).format("YYYY-MM-DD"),
    });
    setIsCreateModalOpen(true);
  };

  const handleCreateEvent = () => {
    if (onAddEvent) {
      onAddEvent({ ...newEvent, id: Date.now() });
    }
    setIsCreateModalOpen(false);
    setNewEvent({
      title: "",
      date: dayjs().format("YYYY-MM-DD"),
      time: "09:00",
      duration: 60,
      color: "blue",
      description: "",
    });
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col bg-white z-0">
      <Card className="flex-1 w-full h-full m-0 p-0 shadow-none bg-white border-0 flex flex-col justify-center items-center">
        <div className="w-full h-full flex-1 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6 gap-4 flex-wrap">
            <div className="flex items-center space-x-4 flex-wrap">
              <CalendarIcon className="w-8 h-8 text-black" />
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <DatePicker
                picker="month"
                value={pickerValue}
                onChange={handleDatePickerChange}
                allowClear={false}
                className="ml-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 hover:border-blue-500 transition-colors"
                getPopupContainer={(trigger) => trigger.parentNode}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  color: "#000",
                  border: "2px solid #d1d5db",
                }}
              />
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={goToToday}
                className="bg-gray-200 text-black border-0 hover:bg-gray-300 shadow-md font-semibold"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth("prev")}
                className="bg-white-100 text-white"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth("next")}
                className="bg-white-100 text-white border-0 hover:bg-gray-200 shadow font-semibold"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </Button>
              <Button
                onClick={() => openCreateModal()}
                className="bg-blue-500 text-white border-0 flex items-center gap-2 shadow-md hover:bg-blue-600 font-semibold"
              >
                <Plus className="w-4 h-4" /> Create Event
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-2 md:p-3 text-center font-semibold text-black bg-gray-100 border border-gray-300 text-xs md:text-base"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0 border border-gray-300 rounded-lg overflow-hidden min-h-[60vh] md:min-h-[500px] bg-white">
            {renderCalendarDays()}
          </div>
          <Modal
            title={
              <span className="text-lg font-semibold text-black">
                Create Event
              </span>
            }
            open={isCreateModalOpen}
            onOk={handleCreateEvent}
            onCancel={() => setIsCreateModalOpen(false)}
            okText="Create"
            cancelText="Cancel"
            bodyStyle={{ background: "#fff", borderRadius: 8, color: "#000" }}
            style={{ borderRadius: 12 }}
          >
            <div className="space-y-3">
              <label className="block">
                <span className="text-black font-semibold">Title</span>
                <Input
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="Event title"
                  style={{ borderRadius: 6, background: "#fff", color: "#000" }}
                />
              </label>
              <label className="block">
                <span className="text-black font-semibold">Date</span>
                <DatePicker
                  value={dayjs(newEvent.date)}
                  onChange={(date) =>
                    setNewEvent({
                      ...newEvent,
                      date: date.format("YYYY-MM-DD"),
                    })
                  }
                  className="w-full"
                  style={{ borderRadius: 6, background: "#fff", color: "#000" }}
                />
              </label>
              <label className="block">
                <span className="text-black font-semibold">Time</span>
                <TimePicker
                  value={dayjs(newEvent.time, "HH:mm")}
                  onChange={(time) =>
                    setNewEvent({ ...newEvent, time: time.format("HH:mm") })
                  }
                  format="HH:mm"
                  className="w-full"
                  style={{ borderRadius: 6, background: "#fff", color: "#000" }}
                />
              </label>
              <label className="block">
                <span className="text-black font-semibold">
                  Duration (minutes)
                </span>
                <Input
                  type="number"
                  value={newEvent.duration}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      duration: Number(e.target.value),
                    })
                  }
                  min={1}
                  className="w-full"
                  style={{ borderRadius: 6, background: "#fff", color: "#000" }}
                />
              </label>
              <label className="block">
                <span className="text-black font-semibold">Color</span>
                <Select
                  value={newEvent.color}
                  onChange={(color) => setNewEvent({ ...newEvent, color })}
                  className="w-full"
                  options={[
                    { value: "blue", label: "Blue" },
                    { value: "red", label: "Red" },
                    { value: "gray", label: "Gray" },
                  ]}
                  style={{ borderRadius: 6, background: "#fff", color: "#000" }}
                />
              </label>
              <label className="block">
                <span className="text-black font-semibold">Description</span>
                <Input.TextArea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  placeholder="Event description"
                  rows={2}
                  style={{ borderRadius: 6, background: "#fff", color: "#000" }}
                />
              </label>
            </div>
          </Modal>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-black font-semibold">Meeting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-black font-semibold">Deadline</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-black font-semibold">Presentation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
              <span className="text-black font-semibold">Conflicts</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
