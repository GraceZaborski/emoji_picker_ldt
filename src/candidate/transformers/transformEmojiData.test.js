import { emojiDataMock } from "../mocks";
import { transformEmojiData } from "./tranformEmojiData";

describe("transformEmojiData", () => {
  it("transforms data", () => {
    const transformedResults = transformEmojiData(emojiDataMock);
    const transformedFirstResult = transformedResults[0];
    expect(transformedFirstResult).toStrictEqual({
      label: "😀 :grinning_face:",
    });
  });
});
