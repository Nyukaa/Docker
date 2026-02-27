import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "./Form";
import "@testing-library/jest-dom";
import { describe, test, expect, jest } from "@jest/globals";

describe("TodoForm", () => {
  test("calls createTodo with the input value when submitted", () => {
    const mockCreateTodo = jest.fn();

    render(<TodoForm createTodo={mockCreateTodo} />);

    // Find input and button
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /submit/i });

    // Type into the input
    fireEvent.change(input, { target: { value: "New Todo" } });

    // Submit the form
    fireEvent.click(button);

    // Expect createTodo to have been called with the correct value
    expect(mockCreateTodo).toHaveBeenCalledWith({ text: "New Todo" });
    expect(mockCreateTodo).toHaveBeenCalledTimes(1);
  });
});
