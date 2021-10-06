import moment from "moment";
import React, { useEffect } from "react";

const CalendarComponent = ({ events, onClick }) => {
  useEffect(() => {
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      initialDate: moment(new Date()).format("YYYY-MM-01"),
      locale: "id",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      eventClick: (e) => {
        onClick(e);
      },
      events: events,
    });

    calendar.render();
  }, []);
  return (
    <div>
      <div id="calendar"></div>
    </div>
  );
};

export default CalendarComponent;
