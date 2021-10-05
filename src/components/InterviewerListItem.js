import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

//props - id, name, avatar, selected, setInterviewer
// setInterviewer -> onChange
const InterviewerListItem = (props) => {
  let classString = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li className={classString} onClick={props.onChange}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
