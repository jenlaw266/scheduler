import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

//props - id, name, avatar, selected, setInterviewer
const InterviewerListItem = (props) => {
  let classString = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li className={classString} onClick={props.setInterviewer}>
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
