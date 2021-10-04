export function getAppointmentsForDay(state, day) {
  const appointmentsArray = [];
  for (const weekday of state.days) {
    if (weekday.name === day) {
      weekday.appointments.forEach((id) => {
        for (const each in state.appointments) {
          if (id === Number(each)) {
            appointmentsArray.push({ ...state.appointments[each] });
          }
        }
      });
    }
  }
  return appointmentsArray;
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
  let interviewers = [];

  for (const weekday of state.days) {
    if (weekday.name === day) {
      weekday.interviewers.forEach((id) => {
        interviewers.push({
          ...state.interviewers[id],
        });
      });
    }
  }
  return interviewers;
}
