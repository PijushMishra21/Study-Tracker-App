import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import StudyTracker from "./StudyTracker";

describe("StudyTracker Component", () => {
  test("renders Study Tracker title", () => {
    render(
      <MemoryRouter>
        <StudyTracker />
      </MemoryRouter>
    );

    const title = screen.getByText(/StudyTime Tracker App/i);
    expect(title).toBeInTheDocument();
  });
});
