import React from "react";

/**
 * Renders question text with:
 * - Passage/question separation (split on double newline)
 * - Underline support via <u>text</u> markers
 * - Line breaks for poetry/formatted text
 */

function renderInlineMarkup(text: string): React.ReactNode[] {
  const parts = text.split(/(<u>.*?<\/u>)/g);
  return parts.map((part, i) => {
    const match = part.match(/^<u>(.*?)<\/u>$/);
    if (match) {
      return (
        <span key={i} className="underline underline-offset-2 decoration-primary decoration-2">
          {match[1]}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function renderWithLineBreaks(text: string): React.ReactNode {
  const lines = text.split("\n");
  if (lines.length === 1) return renderInlineMarkup(text);
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {renderInlineMarkup(line)}
      {i < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}

interface Props {
  text: string;
}

export default function QuestionText({ text }: Props) {
  // Split on double newline to separate passage from question
  const sections = text.split("\n\n").filter(Boolean);

  if (sections.length <= 1) {
    return <p className="font-medium text-sm leading-relaxed">{renderWithLineBreaks(text)}</p>;
  }

  // Last section is the question, everything before is the passage
  const passage = sections.slice(0, -1).join("\n\n");
  const question = sections[sections.length - 1];

  return (
    <div className="space-y-3">
      <div className="bg-muted/50 rounded-lg p-4 text-sm leading-relaxed border border-border/50">
        {renderWithLineBreaks(passage)}
      </div>
      <p className="font-medium text-sm leading-relaxed">{renderInlineMarkup(question)}</p>
    </div>
  );
}
