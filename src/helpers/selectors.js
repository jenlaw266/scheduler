export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0 || state.appointments === 0) return [];

  const selectedDay = state.days.filter((obj) => {
    return obj.name === day;
  });

  const appointments = selectedDay[0].appointments.map(
    (id) => state.appointments[id]
  );

  /*   for (const each of appointmentsArray) {
    if (each.interview) {
      console.log("id: ", each.interview.interviewer);
      const interviewerName =
        state.interviewers[each.interview.interviewer].name;
      console.log("name: ", interviewerName);

      // each.interview.interviewer =
      //   state.interviewers[each.interview.interviewer].name;
    }
  } */
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
