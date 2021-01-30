A single page application (SPA) built using React JS. It allows students to book interviews during weekdays between 12 and 5PM. Students can book, edit or cancel interviews.

## Functional Requirements

React JS (Create React App) was used to build the client-side application. It communicates via Axios calls with an API server over HTTP, using the JSON format.
Tests were built using the Jest, Cypress and Storybook frameworks.

Data is persisted by the [API server](https://github.com/nataliaCodes/scheduler-api) using a PostgreSQL database.
Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Behavioural Requirements

Interviews can be booked between Monday and Friday.

A user can switch between weekdays.

A user can book an interview in an empty appointment slot.

Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.

A user can cancel an existing interview.

A user can edit the details of an existing interview.

The list of days informs the user how many slots are available for each day.

The expected day updates the number of spots available when an interview is booked or canceled.

A user is presented with a confirmation when they attempt to cancel an interview.

A user is shown an error if an interview cannot be saved or deleted.

A user is shown a status indicator while asynchronous operations are in progress.

When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).

The application makes API requests to load and persist data. We do not lose data after a browser refresh.


## Screenshots

![main-view](https://github.com/nataliaCodes/scheduler/blob/master/screenshots/scheduler-view.png)
![full-day](https://github.com/nataliaCodes/scheduler/blob/master/screenshots/scheduler-full-day.png)
![edit-interview](https://github.com/nataliaCodes/scheduler/blob/master/screenshots/scheduler-edit.png)
![delete-interview](https://github.com/nataliaCodes/scheduler/blob/master/screenshots/scheduler-delete.png)
