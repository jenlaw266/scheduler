import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPOINTMENTS = "SET_APPOINTMENTS";
  const SET_DAYS = "SET_DAYS";
  const SET_INTERVIEWERS = "SET_INTERVIEWERS";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPOINTMENTS:
        return { ...state, appointments: action.value };
      case SET_INTERVIEWERS:
        return { ...state, interviewers: action.value };
      case SET_DAYS:
        return { ...state, days: action.value };
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
  };

  const [state, dispatch] = useReducer(reducer, initial);

  // const setDay = (day) => dispatch({ type: SET_DAY, value: day });

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

    dispatch({ type: SET_DAYS, value: days });
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
        dispatch({ type: SET_APPOINTMENTS, value: appointments });
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

      .then(() => dispatch({ type: SET_APPOINTMENTS, value: appointments }))
      .then(() => updateSpots(appointments));
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((res) => {
      dispatch({ type: SET_INTERVIEWERS, value: res[2].data });
      dispatch({ type: SET_APPOINTMENTS, value: res[1].data });
      dispatch({ type: SET_DAYS, value: res[0].data });
    });
  }, []);

  //incomplete webSocket
  useEffect(() => {
    const webSocket = new WebSocket(
      "ws://localhost:8001"
      //process.env.REACT_APP_WEBSOCKET_URL
    );
    webSocket.onmessage = (event) => {
      console.log("websocket event.data: ", event.data);
    };
    webSocket.onopen = () => {
      webSocket.send("ping");
    };
    return () => {
      webSocket.close();
    };
  }, [state]);

  return { state, setDay, bookInterview, cancelInterview };
}
