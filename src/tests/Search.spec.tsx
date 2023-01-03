import { render, screen } from "@testing-library/react";
import { Search } from "../components/Search";

describe("Search", () => {
  it("should render Search component", async () => {
    render(<Search name="hello" />);

    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
