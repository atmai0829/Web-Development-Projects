import "./calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { enUS } from "date-fns/locale";

export const CalendarDisp = ({ data }) => {
  const [events2, setEvents2] = useState(
    data.map((task) => {
      return {
        title: task.task_name,
        start: new Date(task.task_due),
        end: new Date(task.task_due),
      };
    })
  );

  const locales = {
    "en-US": enUS,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  return (
    <div className="taskListHolder">
      <Calendar
        localizer={localizer}
        events={events2}
        startAccessor="start"
        endAccessor="end"
        className="CalendarDisp"
      ></Calendar>
    </div>
  );
};
