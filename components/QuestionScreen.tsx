"use client";

import { Question } from "@/data/quiz";

interface QuestionScreenProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuestionScreen({ question, onAnswer }: QuestionScreenProps) {
  return (
    <div
      className="animate-fade-in flex flex-col justify-center h-full w-full"
      style={{ backgroundColor: "#231F20", padding: "0 clamp(2rem, 8vw, 7rem)" }}
    >
      {/* Headline with mixed typography */}
      <h1
        className="font-black leading-tight"
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
          color: "#ffffff",
          maxWidth: "800px",
          marginBottom: "clamp(1.2rem, 2.5vh, 2rem)",
        }}
      >
        {question.headlinePlain}{" "}
        <span
          className="font-script"
          style={{
            color: "#ffcd2b",
            fontSize: "1.1em",
          }}
        >
          {question.headlineScript}
        </span>
        {question.headlineAfter && <> {question.headlineAfter}</>}
      </h1>

      {/* Subtext */}
      <p
        className="leading-relaxed"
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
          color: "#ffffff",
          maxWidth: "640px",
          marginBottom: "clamp(2rem, 4vh, 3rem)",
        }}
      >
        {question.subtext}
      </p>

      {/* Answer buttons */}
      <div className="flex flex-wrap gap-4">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => onAnswer(answer.isCorrect)}
            className="font-extrabold transition-all hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "#ffcd2b",
              color: "#231F20",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              minWidth: "180px",
              padding: "1rem 2rem",
              borderRadius: "1rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}
