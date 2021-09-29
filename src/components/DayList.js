import React from "react";
import DayListItem from "./DayListItem";

//props - days, day, setDay
const DayList = (props) => {
  const week = props.days.map((day) => {
    return (
      <DayListItem
        key={day.name}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{week}</ul>;
};

export default DayList;
