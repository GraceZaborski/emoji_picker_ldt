export const transformEmojiData = (emojiDataRaw) =>
  emojiDataRaw.map((elem) => {
    const underscoreTitle = elem.slug.replaceAll("-", "_");
    const label = `${elem.character} :${underscoreTitle}:`;
    return { label };
  });
