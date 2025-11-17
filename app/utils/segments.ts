export type StreamSegment =
  | { type: "text"; content: string }
  | { type: "tag"; tagName: string; content: string };

const TAG_REGEX = /<([a-zA-Z0-9_-]+)>([\s\S]*?)<\/\1>/g;

export function extractSegments(text: string): StreamSegment[] {
  const segments: StreamSegment[] = [];
  let lastIndex = 0;

  TAG_REGEX.lastIndex = 0;
  let match;

  while ((match = TAG_REGEX.exec(text))) {
    const start = match.index;
    const end = TAG_REGEX.lastIndex;

    if (start > lastIndex) {
      segments.push({
        type: "text",
        content: text.slice(lastIndex, start),
      });
    }

    segments.push({
      type: "tag",
      tagName: match[1],
      content: match[2],
    });

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    segments.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  return segments;
}
