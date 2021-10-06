import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //useReducer -day, application data, update interview
  /* 

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
        return {...state, day: action.value}
      case SET_APPLICATION_DATA:
        return {...action.value}
      case SET_INTERVIEW: {
        return {...state, interview: action.value}
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

const initial = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  }

const reducerFun = (state, action){
  const { day, days, appointments, interviewers} = action;
  
  if (action.type === "day"){
    return {...state, day: action.value} 
  }
}

const [state, dispatch] = useReducer(reducerFuc, initial)



*/

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = (appointments) => {
    let count = 0;

    const selectedDay = state.days.filter((obj) => obj.name === state.day);

    selectedDay[0].appointments.forEach((id) => {
      if (!appointments[id].interview) count++;
    });

    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots: count };
      }
      return day;
    });

    setState((prev) => ({ ...prev, days })); // ()=>dispatch({type: ,value:})
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev) => ({ ...prev, appointments }));
      })
      .then(() => updateSpots(appointments));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState((prev) => ({ ...prev, appointments })))
      .then(() => updateSpots(appointments));
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((res) => {
      const days = res[0].data;
      const appointments = res[1].data;
      const interviewers = res[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
