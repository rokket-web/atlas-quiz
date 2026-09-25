export type Answer = {
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  headlinePlain: string;
  headlineScript: string;
  headlineAfter?: string;
  subtext: string;
  answers: Answer[];
  correctFeedback: {
    heading: string;
    body: string;
  };
  incorrectFeedback: {
    heading: string;
    body: string;
  };
};

export const questions: Question[] = [
  {
    id: 1,
    headlinePlain: "human trafficking inc. is in the",
    headlineScript: "people",
    headlineAfter: "business.",
    subtext:
      "We're buying and selling millions of people, all around the world, right now. Can you guess how many?",
    answers: [
      { text: "3.9 million", isCorrect: false },
      { text: "14.8 million", isCorrect: false },
      { text: "27.6 million", isCorrect: true },
    ],
    correctFeedback: {
      heading: "That's right!",
      body: "27.6 million people are trafficked around the globe as we speak. Standing shoulder to shoulder, that lineup would stretch longer than the earth is wide!",
    },
    incorrectFeedback: {
      heading: "Good guess!",
      body: "But our business is bigger than you thought! 27.6 million people are trafficked around the globe as we speak. Standing shoulder to shoulder, that lineup would stretch longer than the earth is wide!",
    },
  },
  {
    id: 2,
    headlinePlain: "Kids play a",
    headlineScript: "key role",
    headlineAfter: "at human trafficking inc.",
    subtext:
      "Our workforce is substantially made up by children. Can you guess what percent?",
    answers: [
      { text: "10%", isCorrect: false },
      { text: "25%", isCorrect: false },
      { text: "35%", isCorrect: true },
    ],
    correctFeedback: {
      heading: "That's right!",
      body: "At human trafficking inc., we make millions off of the exploitation of children. This is thanks to systems that keep them vulnerable, and continued demand of buyers looking to purchase children.",
    },
    incorrectFeedback: {
      heading: "Good guess!",
      body: "It's hard to believe children have this much of a role at human trafficking inc! This is thanks to systems that keep them vulnerable, and continued demand of buyers looking to purchase children.",
    },
  },
  {
    id: 3,
    headlinePlain: "Business is",
    headlineScript: "booming.",
    subtext:
      "We've never been exploiting this many people at one time in history! Can you guess human trafficking's annual income?",
    answers: [
      { text: "$74 billion", isCorrect: false },
      { text: "$198 billion", isCorrect: false },
      { text: "$236 billion", isCorrect: true },
    ],
    correctFeedback: {
      heading: "That's right!",
      body: "That's $27 million an hour. And we don't see the business slowing down any time soon—demand is higher than ever!",
    },
    incorrectFeedback: {
      heading: "Good guess!",
      body: "But we're making way more than you even knew! Currently, human trafficking brings in $27 million an hour. And we don't see the business slowing down any time soon—demand is higher than ever!",
    },
  },
  {
    id: 4,
    headlinePlain: "We're never",
    headlineScript: "off the clock!",
    subtext:
      "Trafficking victims don't take PTO. They work so hard, it's hard for anyone to find them, so remain locked in this system with no way out. Can you guess the % of trafficking victims who are identified?",
    answers: [
      { text: "<1%", isCorrect: true },
      { text: "<20%", isCorrect: false },
      { text: "<50%", isCorrect: false },
    ],
    correctFeedback: {
      heading: "That's right!",
      body: "Less than 1% of trafficking victims are ever identified. They remain hidden in plain sight, locked in a system designed to keep them invisible and without help.",
    },
    incorrectFeedback: {
      heading: "Good guess!",
      body: "Actually, less than 1% of trafficking victims are ever identified. They remain hidden in plain sight, locked in a system designed to keep them invisible and without help.",
    },
  },
];
