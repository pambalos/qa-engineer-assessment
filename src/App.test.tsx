import {fireEvent, getAllByRole, render} from "@testing-library/react";
import React from "react";
import App from "./App";
import "@testing-library/jest-dom";

/*
    I started with a couple of general render tests to make sure the app renders correctly.
 */
test("renders App", () => {
  const {getByText} = render(<App />);
  const header = getByText(/Todo List/i);
  expect(header).toBeInTheDocument();
});

test("renders initial todos", () => {
    const {getByText} = render(<App />);
    const groceries = getByText(/Buy groceries/i);
    const reboot = getByText(/Reboot computer/i);
    const interview = getByText(/Ace CoderPad interview/i);
    expect(groceries).toBeInTheDocument();
    expect(reboot).toBeInTheDocument();
    expect(interview).toBeInTheDocument();
});

/*
    I then wrote a few tests to check the toggling functionality of the todo items, as per instructions from the read me for step 1.
    I chose to cover all of the initial todo items as default cases as well as a newly added item.
    I chose the Jest testing library because it fits with React quite seamlessly and is easy to use.
 */
// default todo item 1, fails
test("(1) Toggling todo items 1", () => {
    const {getByText} = render(<App />);
    const groceries = getByText(/Buy groceries/i);
    const checkbox = groceries.previousElementSibling as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
});


// Default todo item 2, fails
test("(1) Toggling todo items 2", () => {
    const {getByText} = render(<App />);
    const reboot = getByText(/Reboot computer/i);
    const checkbox = reboot.previousElementSibling as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
});

// Default todo item 3, fails
test("(1) Toggling todo items 3", () => {
    const {getByText} = render(<App />);
    const interview = getByText(/Ace CoderPad interview/i);
    const checkbox = interview.previousElementSibling as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
});

// This is a bit more of an end-to-end test, where I create a new todo item and then toggle it.
// With all of these test failures, this also needs a bug ticket.
test("(1) Toggling a new todo item", () => {
    const {getByText, getByPlaceholderText} = render(<App />);
    const input = getByPlaceholderText(/Add a new todo item here/i);
    fireEvent.change(input, {target: {value: "New todo item"}});
    fireEvent.submit(input);
    expect(input).toHaveValue("");
    const newTodo = getByText(/New todo item/i);
    expect(newTodo).toBeInTheDocument();
    const checkbox = newTodo.previousElementSibling as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
});

/*
    For step 2 of the tests, state persistence, after confirming that checking and unchecking did indeed not work through the UI,
    I chose to use the creation of a new todo item as the test case, as that would be expected for state persistence.
 */
test("(2) State Persistence", () => {
    const {getByText} = render(<App />);
    const input = getByText(/New todo item/i);
    fireEvent.change(input, {target: {value: "Another todo item"}});
    fireEvent.submit(input);
    expect(input).toHaveValue("");
    const newTodo = getByText(/Another todo item/i);
    expect(newTodo).toBeInTheDocument();

    const reload = render(<App />);
    const reloadedTodo = reload.getByText(/Another todo item/i);
    expect(reloadedTodo).toBeInTheDocument();
});

/*
    For step 3 of the tests, adding items to the bottom of the list, I chose to use the creation of a new todo item as the test case,
    and see if it was at the top or the bottom. One of these test cases is an expected failure case, and it clearly does not fail.
 */
// this expected test case is failing, therefore I would open a bug report, or simply change the code myself to fix it.
test("(3) Adding items to the bottom of the list", () => {
    const {getByPlaceholderText} = render(<App />);
    const input = getByPlaceholderText(/Add a new todo item here/i);
    fireEvent.change(input, {target: {value: "Another todo item"}});
    fireEvent.submit(input);

    const toDos = getAllByRole(document.body, "checkbox");
    const lastToDo = toDos[toDos.length - 1];
    const label = lastToDo.nextElementSibling;
    expect(label).toHaveTextContent("Another todo item");
});

// whereas I may not have felt that a failure case is necessary for all tests, after discovering the failing nature of the
// previous test, I decided to add a failure case for this test as well, which does not fail. - this just confirms the bug
test("(x) Should fail adding items to top of list", () => {
    const {getByPlaceholderText} = render(<App />);
    const input = getByPlaceholderText(/Add a new todo item here/i);
    fireEvent.change(input, {target: {value: "Another todo item"}});
    fireEvent.submit(input);

    const toDos = getAllByRole(document.body, "checkbox");
    const lastToDo = toDos[0];
    const label = lastToDo.nextElementSibling;
    expect(label).toHaveTextContent("Another todo item");
});


/*
    In conclusion, I would have to open 3 bug tickets, one for each one of the scenarios/items
    that I was supposed to test in the first place.
 */