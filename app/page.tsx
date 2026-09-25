"use client";

import { useState } from "react";
import { questions } from "@/data/quiz";
import LandingScreen from "@/components/LandingScreen";
import QuestionScreen from "@/components/QuestionScreen";
import FeedbackScreen from "@/components/FeedbackScreen";
import ErrorScreen from "@/components/ErrorScreen";
import ClosingScreen from "@/components/ClosingScreen";
import OptInScreen from "@/components/OptInScreen";
import DonateScreen from "@/components/DonateScreen";

type Phase =
  | { name: "landing" }
  | { name: "question"; index: number }
  | { name: "feedback"; index: number; isCorrect: boolean }
  | { name: "error" }
  | { name: "closing" }
  | { name: "optin" }
  | { name: "donate" };

export default function Home() {
  const [phase, setPhase] = useState<Phase>({ name: "landing" });

  function handleStart() {
    setPhase({ name: "question", index: 0 });
  }

  function handleAnswer(isCorrect: boolean) {
    if (phase.name !== "question") return;
    setPhase({ name: "feedback", index: phase.index, isCorrect });
  }

  function handleNext() {
    if (phase.name !== "feedback") return;
    const nextIndex = phase.index + 1;
    if (nextIndex < questions.length) {
      setPhase({ name: "question", index: nextIndex });
    } else {
      setPhase({ name: "error" });
    }
  }

  function handleErrorDone() {
    setPhase({ name: "closing" });
  }

  function handleContinue() {
    setPhase({ name: "optin" });
  }

  function handleOptInContinue() {
    setPhase({ name: "donate" });
  }

  const screenKey =
    phase.name === "feedback"
      ? `feedback-${phase.index}-${phase.isCorrect}`
      : phase.name === "question"
      ? `question-${phase.index}`
      : phase.name;

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ backgroundColor: "#231F20" }}
    >
      <div key={screenKey} className="h-full w-full">
        {phase.name === "landing" && (
          <LandingScreen onStart={handleStart} />
        )}

        {phase.name === "question" && (
          <QuestionScreen
            question={questions[phase.index]}
            onAnswer={handleAnswer}
          />
        )}

        {phase.name === "feedback" && (
          <FeedbackScreen
            question={questions[phase.index]}
            isCorrect={phase.isCorrect}
            onNext={handleNext}
            isLast={phase.index === questions.length - 1}
          />
        )}

        {phase.name === "error" && (
          <ErrorScreen onContinue={handleErrorDone} />
        )}

        {phase.name === "closing" && (
          <ClosingScreen onContinue={handleContinue} />
        )}

        {phase.name === "optin" && (
          <OptInScreen onContinue={handleOptInContinue} />
        )}

        {phase.name === "donate" && <DonateScreen />}
      </div>
    </div>
  );
}
