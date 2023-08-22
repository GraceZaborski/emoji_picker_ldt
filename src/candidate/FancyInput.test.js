import * as axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import { FancyInput } from "./FancyInput";
import { emojiDataMock } from "./mocks";
import userEvent from "@testing-library/user-event";

describe.only("FancyInput", () => {
  describe("Data success scenarios", () => {
    // beforeEach(async () => {
    //   jest.mock("axios");
    //   Object.defineProperty(axios, "get", {
    //     value: jest
    //       .fn()
    //       .mockImplementation(() => ({ data: { emojiDataMock } })),
    //   });
    // });

    it("renders without error", () => {
      render(<FancyInput placeholder={"Please make me fancy 🤩"} />);
      expect(
        screen.getByPlaceholderText("Please make me fancy 🤩")
      ).toBeInTheDocument();
    });

    it("opens popover when user inputs : and two string characters", async () => {
      render(<FancyInput placeholder={"Please make me fancy 🤩"} />);
      const input = screen.getByPlaceholderText("Please make me fancy 🤩");
      userEvent.type(input, ":gr");
      expect(
        await screen.findByRole("option", { name: "😀 :grinning_face:" })
      ).toBeInTheDocument();
    });

    it("closes popover when user inputs space", async () => {
      render(<FancyInput placeholder={"Please make me fancy 🤩"} />);
      const input = screen.getByPlaceholderText("Please make me fancy 🤩");
      userEvent.type(input, ":gr");
      expect(
        await screen.findByRole("option", { name: "😀 :grinning_face:" })
      ).toBeInTheDocument();
      await userEvent.type(input, "  ");
      await waitFor(() => {
        expect(input).toHaveValue(":gr  ");
      });
      expect(
        screen.queryByRole("option", { name: "😀 :grinning_face:" })
      ).not.toBeInTheDocument();
    });
  });
});

//TODO: mock axios api successfully
describe.skip("Data failure scenarios", () => {
  beforeEach(async () => {
    jest.mock("axios");
    Object.defineProperty(axios, "get", {
      value: jest.fn().mockRejectedValue(() => new Error("Some network error")),
    });
  });

  it("renders error text", async () => {
    render(<FancyInput placeholder={"Please make me fancy 🤩"} />);
    const input = screen.getByPlaceholderText("Please make me fancy 🤩");
    userEvent.type(input, ":gr");
    expect(await screen.findByText("Error loading data")).toBeInTheDocument();
  });
});
