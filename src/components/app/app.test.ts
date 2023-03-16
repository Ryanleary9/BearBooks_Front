import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./App";
App;
describe("Given the ", () => {
  test("Then it should ", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
