function removeEmojis(str: string): string {
  // This regex pattern includes various emoji ranges and accounts for
  // combined emoji characters and optionally one or more space characters following the emoji.
  const emojiRegex =
    /(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji_Modifier_Base}|\p{Emoji_Modifier})\p{Emoji_Component}*\s*/gu;
  return str.replace(emojiRegex, "");
}

export const prettify = (value?: string) => {
  if (!value) return "";
  const trimmed = value.trim();
  const withoutEmojis = removeEmojis(trimmed);
  const lowercased = withoutEmojis.toLowerCase();
  const hyphenated = lowercased.replace(" ", "-");

  return hyphenated;
};
