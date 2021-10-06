export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter((obj) => {
    return obj.name === day;
  });

  if (state.appointments === 0 || selectedDay.length === 0) return [];

  const appointments = selectedDay[0].appointments
    .map((id) => {
      return state.appointments[id];
    })
    .map((item) => {
      if (item.interview && item.interview.interviewer) {
        return {
          ...item,
          name: state.interviewers[item.interview.interviewer].name,
        };
      }
      return item;
    });

  return appointments;
}

export function getInterview(state, interview) {
  if (interview) {
    for (const id in state.interviewers) {
      if (Number(id) === interview.interviewer) {
        return { ...interview, interviewer: { ...state.interviewers[id] } };
      }
    }
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.filter((obj) => {
    return obj.name === day;
  });

  if (selectedDay.length) {
    const interviewers = selectedDay[0].interviewers.map(
      (id) => state.interviewers[id]
    );
    return interviewers;
  }

  return [];
}
