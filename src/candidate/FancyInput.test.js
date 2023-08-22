import * as axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import { FancyInput } from "./FancyInput";
import { emojiDataMock } from "./mocks";

describe("FancyInput", () => {
  describe("Data success scenarios", () => {
    beforeEach(async () => {
      jest.mock("axios");
      Object.defineProperty(axios, "get", {
        value: jest
          .fn()
          .mockImplementation(() => ({ data: { emojiDataMock } })),
      });
    });

    it.only("renders without error", async () => {
      render(<FancyInput placeholder={"Please make me fancy 🤩"} />);
      expect(
        await screen.findByPlaceholderText("Please make me fancy 🤩")
      ).toBeInTheDocument();
    });

    // it("returns data in popover", async () => {
    //   render(<FancyInput placeholder={"Please make me fancy 🤩"} />);
    //   //   expect(
    //   //     await screen.findByRole("option", {
    //   //       name: "😄 :grinning_face_with_smiling_eyes:",
    //   //     })
    //   //   ).toBeInTheDocument();
    //   await waitFor(async () => {
    //     await screen.findByRole("option", {
    //       name: "😄 :grinning_face_with_smiling_eyes:",
    //     });
    //   });
    // });
  });

  describe("Data failure scenarios", () => {
    beforeEach(async () => {
      jest.mock("axios");
      Object.defineProperty(axios, "get", {
        value: jest
          .fn()
          .mockRejectedValue(() => new Error("Some network error")),
      });
    });

    it("renders error text", async () => {
      render(<FancyInput placeholder={"Please make me fancy 🤩"} />);
      expect(await screen.findByText("Error loading data")).toBeInTheDocument();
    });
  });
});
