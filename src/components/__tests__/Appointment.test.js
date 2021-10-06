import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

// props - id, time, interview, interviewers //bookInterview, cancelInterview
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(
      <Appointment
        id={1}
        time={"12pm"}
        interview={{ interview: null }}
        interviewers={{ 1: "Amy", 2: "John" }}
        bookInterview={jest.fn()}
        cancelInterview={jest.fn()}
      />
    );
  });
});
