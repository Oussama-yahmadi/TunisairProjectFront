import { QuizAnswer } from "./QuizAnswer";

export class QuizQuestion {
    id!: number;
    questionText!: string;
    answers!: QuizAnswer[];
  }