import React from "react";

import { render, cleanup, getByText, getAllByTestId, getByAltText, getByPlaceholderText, waitForElement, fireEvent, prettyDOM } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    
    // Render the Application.
    const { container, debug } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //target appointments in the DOM nodes
    const appointments = getAllByTestId(container, "appointment");

    //target first appointment = empty
    const appointment = appointments[0];

    // Click the "Add" button on the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "Saving" is displayed.
    //to make sure the test is indeed working, toBeInTheDocument can be negated
    //which will crash the test
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    
    // debug(appointment); //<-- this will show us what the element looks like(and that Saving is indeed present)

    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    debug(appointment);

    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".

  });

});

