import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";
import { interviewers} from "./fixtures"

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment interviewers={interviewers} />);
  });
});
