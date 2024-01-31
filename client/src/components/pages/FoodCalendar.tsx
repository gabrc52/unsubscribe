import React, { useEffect, useState, useRef } from "react";
import FoodEvent, { FoodCategory } from "../../../../shared/FoodEvent";
import FullCalendar from "@fullcalendar/react";
import { Calendar, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./FoodCalendar.css";

/// TODO: fix colors on dark mode! - custom css maybe? idk!

// Get color by category
const categoryToColor = (category: FoodCategory | undefined) => {
  // TODO(ari) choose better colors
  if (category === "Groceries") {
    return "#b5e670";
  } else if (category === "Meal") {
    return "#ffac31";
  } else {
    // snack or drink
    return "#819ff1";
  }
};

const convertToCalendarEvent = (foodEvent: FoodEvent): EventInput => {
  const startTime = foodEvent.scheduledDate;
  // according to chatgpt, looks wrong but there's probably not going to be anything scheduled at almost midnight
  // maybe i would try to convert to unix then add the equivalent of 1 hour then convert back
  // either way, adding one hour is arbitrary...
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 1);

  return {
    id: foodEvent._id,
    title: foodEvent.title || `${foodEvent.food_type} in ${foodEvent.location}`,
    url: `${window.location.origin}/food/scheduled/#${foodEvent._id}`,
    start: startTime,
    end: endTime,
    textColor: "#283857",
    color: categoryToColor(foodEvent.food_category),
  };
};

// https://fullcalendar.io/demos

export default function FoodCalendar(props: { foodEvents: FoodEvent[] }) {
  const calendarRef = useRef<FullCalendar>(null);

  // Pretty sure we don't need this, but leaving as a refernece juts in case
  /*const handleAddEvent = () => {
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
  };*/
  return (
    <FullCalendar
      ref={calendarRef}
      // TODO: i like height auto but it breaks the header on dark mode
      //   height="auto"
      // height="100vh" // comment out for full squares + scrolling
      //   stickyHeaderDates={true} // auto by default, meaning the calendar has the potential to be very tall, sticky-header-dates will be activated
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      timeZone="EST"
      headerToolbar={{
        //   left: "prev,next",
        //   center: "title",
        //   right: "dayGridMonth,dayGridWeek", // user can switch between the two
        left: "title",
        // center: "prev,addEventButton,next",
        center: "prev,next",
        // TODO: choosing timeGrid instead of dayGrid because it looks more Googel Calendar - actually shows
        // start and end time - but maybe the other is bette ron mobile
        right: "today dayGridMonth,timeGridWeek,timeGridDay", // user can switch between the two
      }}
      // https://fullcalendar.io/docs/date-formatting
      //   titleFormat={{ // will produce something like "Tuesday, September 18, 2018"
      //     month: 'long',
      //     year: 'numeric',
      //     day: 'numeric',
      //     weekday: 'long'
      //   }}
      events={props.foodEvents.map(convertToCalendarEvent)}
      // sample events, definitely works
      /*events={[
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
      ]}*/
      // customButtons={{
      //   addEventButton: {
      //     text: "Add Event...",
      //     click: handleAddEvent,
      //   },
      // }}
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
