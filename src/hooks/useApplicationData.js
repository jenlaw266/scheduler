import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const setAppointments = (appointments) =>
    setState((prev) => ({ ...prev, appointments }));

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

    setState((prev) => ({ ...prev, days }));
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

    setState({ ...state, appointments });

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setAppointments(appointments);
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

    setState({ ...state, appointments });

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setAppointments(appointments))
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
