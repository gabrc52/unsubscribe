import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { get } from "../../utilities";
import "./Scheduled.css";

// https://fullcalendar.io/demos

export default function DemoApp() {
  const calendarRef = useRef<FullCalendar>(null);

  const handleAddEvent = () => {
    const dateStr = prompt("Enter a date in YYYY-MM-DD format");
    const date = new Date(dateStr + "T00:00:00");

    if (!isNaN(date.valueOf())) {
      if (calendarRef.current) {
        calendarRef.current.getApi().addEvent({
          title: "dynamic event",
          start: date,
          allDay: true,
        });
        alert("Great. Now, update your database...");
      }
    } else {
      alert("Invalid date.");
    }
  };
  return (
    <FullCalendar
      ref={calendarRef}
      //   height="auto"
      height="100vh" // comment out for full squares + scrolling
      //   stickyHeaderDates={true} // auto by default, meaning the calendar has the potential to be very tall, sticky-header-dates will be activated
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      timeZone="EST"
      headerToolbar={{
        //   left: "prev,next",
        //   center: "title",
        //   right: "dayGridMonth,dayGridWeek", // user can switch between the two
        left: "title",
        center: "prev,addEventButton,next",
        right: "today dayGridMonth,dayGridWeek,dayGridDay", // user can switch between the two
      }}
      // https://fullcalendar.io/docs/date-formatting
      //   titleFormat={{ // will produce something like "Tuesday, September 18, 2018"
      //     month: 'long',
      //     year: 'numeric',
      //     day: 'numeric',
      //     weekday: 'long'
      //   }}
      events={[
        // https://fullcalendar.io/docs/event-object
        {
          id: "a", // useful for getEventById
          title: "my event",
          start: "2024-02-02", // YYYY-MM-DD
          url: "/link/to/foodcard?",
          backgroundColor: "purple", // default is blue, can use any of the CSS color formats #f00, #ff0000, rgb(255,0,0), red
          borderColor: "purple", // default is blue
          textColor: "white", // default is white
          location: "location", // non-standard fields allowed; moved into the extendedProps hash during event parsing, e.g., eventDidMount: function(info) {console.log(info.event.extendedProps);}
        },
        {
          id: "b",
          title: "my event 2",
          start: "2024-01-23T10:30:00",
          end: "2019-01-23T12:30:00",
          backgroundColor: "purple",
        },
      ]}
      customButtons={{
        addEventButton: {
          text: "Add Event...",
          click: handleAddEvent,
        },
      }}
      // event sources https://fullcalendar.io/docs/event-source-object

      // Event-generating function:
      // {
      // events: function(info, successCallback, failureCallback) {
      //     // ...
      // },
      // color: 'yellow',   // an option!
      // textColor: 'black' // an option!
      // }

      // Google Calendar feed:
      // {
      // googleCalendarId: 'abcd1234@group.calendar.google.com',
      // color: 'yellow',   // an option!
      // textColor: 'black' // an option!
      // }
    />
  );
}
