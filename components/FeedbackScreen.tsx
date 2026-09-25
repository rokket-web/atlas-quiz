"use client";

import { Question } from "@/data/quiz";

interface FeedbackScreenProps {
  question: Question;
  isCorrect: boolean;
  onNext: () => void;
  isLast: boolean;
}

export default function FeedbackScreen({
  question,
  isCorrect,
  onNext,
  isLast,
}: FeedbackScreenProps) {
  const feedback = isCorrect
    ? question.correctFeedback
    : question.incorrectFeedback;

  const correctAnswer = question.answers.find((a) => a.isCorrect)!;

  return (
    <div
      className="animate-fade-in flex flex-col justify-center h-full w-full"
      style={{ backgroundColor: "#231F20", padding: "0 clamp(2rem, 8vw, 7rem)" }}
    >
      {/* Feedback heading */}
      <h2
        className="font-black"
        style={{
          fontFamily: "'Garet', sans-serif",
          fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
          color: "#ffffff",
          marginBottom: "clamp(1rem, 2vh, 1.5rem)",
        }}
      >
        {feedback.heading}
      </h2>

      {/* Feedback body */}
      <p
        className="leading-relaxed"
        style={{
          fontFamily: "'Garet', sans-serif",
          fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
          color: "#ffffff",
          maxWidth: "620px",
          marginBottom: "clamp(1.5rem, 3.5vh, 2.5rem)",
        }}
      >
        {feedback.body}
      </p>

      {/* Answer pills — correct one highlighted in white */}
      <div
        className="flex flex-wrap gap-4"
        style={{ marginBottom: "clamp(1.5rem, 3.5vh, 2.5rem)" }}
      >
        {question.answers.map((answer, i) => (
          <div
            key={i}
            className="font-extrabold"
            style={{
              backgroundColor: answer.isCorrect ? "#f5f5f5" : "#ffcd2b",
              color: "#231F20",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              minWidth: "180px",
              padding: "1rem 2rem",
              borderRadius: "1rem",
              textAlign: "center",
            }}
          >
            {answer.text}
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className="font-extrabold transition-all hover:opacity-80 active:scale-95"
        style={{
          backgroundColor: "transparent",
          border: "2px solid #ffcd2b",
          color: "#ffcd2b",
          fontFamily: "'Garet', sans-serif",
          fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
          padding: "0.9rem 2.5rem",
          borderRadius: "1rem",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        {isLast ? "see what you can do →" : "next question →"}
      </button>
    </div>
  );
}
