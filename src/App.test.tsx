import {fireEvent, getAllByRole, render} from "@testing-library/react";
import React from "react";
import App from "./App";
import "@testing-library/jest-dom";

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