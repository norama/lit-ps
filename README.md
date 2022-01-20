## Lit-ps Demo Application

### The Demo Application

This [demo application](https://lit-ps-noramamatema.vercel.app/)
is just a very simple implementation of the ideas below.

The application board is a lottery client, it consists of

-   a selectable winner type, `A`, `B` or `C`.
-   a score display (how many of the winner type has been drawn so far)
-   a result display showing the last result of the lottery
-   buttons:
    -   to `DRAW` (run the lottery),
    -   to `CHEAT` (locally display the winner type and increase the score),
    -   to `DISABLE` other clients for 10 sec (configurable in `config.ts`)

DISABLE means that buttons are disabled but the last result is PINGed at the end and it counts.

The main application contains 3 application boards and a batch runner board with

-   number of draws
-   `START`, `STOP`, `RESET` buttons

The Demo Application is running [here](https://lit-ps-noramamatema.vercel.app/).

### The Test Application

There is a [test application](https://lit-ps-noramamatema.vercel.app/test.html) demonstrating
the testing capabilities of this small framework:

-   async requests are decoupled, so it is possible to use a mock draw function which returns always `A`
-   adding a test [controller](https://lit.dev/docs/composition/controllers/#using-a-controller)
    enables us storing and testing the call stack
-   since lit components are standard web components, our UI javascript objects
    are in 1-1 correspondence with the DOM and hence we can directly check component state

The test application contains 2 application boards and a test runner board with configurable test cases
(`mainApplicationTestCases.ts`, `applicationPSTestCases.ts`). Test cases can be run individually (`Run`)
or all at once (`Run All`), test case 7. is deliberately designed to fail.

The test application is running [here](https://lit-ps-noramamatema.vercel.app/test.html).

### Lit Component Structure

This application is an attempt to introduce new front-end programming practices based on
[Lit components](https://lit.dev/) and [PubSubJS](https://github.com/mroderick/PubSubJS).

Lit components are grouped according to functionality:

-   design
    -   **layout**: arrangement of elements on page, e.g. `RowLayout`, `ColumnLayout`, `CenterLayout`
    -   **widget**: low level UI elements with CSS, e.g. `ProgressBar`, `ActionButton`
-   operation
    -   **application**: application level UI elements
    -   **control**: application controller managing application state and render
        as well as instructing PubSub messaging component upon user action
    -   **application/test**: test application with access to lit components' state
        (as lit component on UI is the same object as the JavaScript object -
        contrary to React's virtual DOM)
    -   **ps**: [PubSubJS](https://github.com/mroderick/PubSubJS) messaging components attached to  
        application components for handling async actions and communication between components, see below

### The Dispatcher

The **dispatcher** is the central message handler accessed by message publishing / subscribing
from **ps** components. Subscribes to the following messages:

-   `REQUEST`: performs the specified async request and then broadcasts the result
-   `CANCEL`: cancels request
-   `STATE`: broadcasts component state
-   `PING`: broadcasts pinged message state again

## Open-wc Starter App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Quickstart

To get started:

```sh
npm init @open-wc
# requires node 10 & npm 6 or higher
```

## Scripts

-   `start` runs your app for development, reloading on file changes
    the main application is running on `localhost:8000`,
    the test application is on `localhost:8000/test.html`
-   `start:build` runs your app after it has been built using the build command
-   `build` builds your app and outputs it in your `dist` directory
-   `test` runs your test suite with Web Test Runner
-   `lint` runs the linter for your project
