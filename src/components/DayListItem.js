import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

// props - name, spots, selected, setDay
const DayListItem = (props) => {
  const formatProps = (spots) => {
    if (spots === 1) {
      return `${spots} spot remaining`;
    }
    if (spots > 1) {
      return `${spots} spots remaining`;
    }
    return "no spots remaining";
  };

  let classString = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li className={classString} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatProps(props.spots)}</h3>
    </li>
  );
};

export default DayListItem;
