import * as axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import { FancyInput } from "./FancyInput";
import { emojiDataMock } from "./mocks";
import userEvent from "@testing-library/user-event";

describe("FancyInput", () => {
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

    // TODO: improve this test
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

    it("filters the emojis based on search string", async () => {
      render(<FancyInput placeholder={"Please make me fancy 🤩"} />);
      const input = screen.getByPlaceholderText("Please make me fancy 🤩");
      userEvent.type(input, ":grinning");
      const options = await screen.findAllByRole("option");
      expect(options).toHaveLength(7);
      await userEvent.type(input, ":grinning_cat");
      const options2 = await screen.findAllByRole("option");
      expect(options2).toHaveLength(2);
    });

    it("replaces emoji search string with emoji when chosen", async () => {
      render(<FancyInput placeholder={"Please make me fancy 🤩"} />);
      const input = screen.getByPlaceholderText("Please make me fancy 🤩");
      userEvent.type(input, ":grinning_cat");
      const chosenOption = await screen.findByRole("option", {
        name: "😺 :grinning_cat:",
      });
      await userEvent.click(chosenOption);
      await waitFor(() => {
        expect(
          screen.queryByRole("option", { name: "😺 :grinning_cat:" })
        ).not.toBeInTheDocument();
      });
      expect(input).toHaveValue("😺");
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
