export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizData {
  reasoning: Question[];
  aptitude: Question[];
  english: Question[];
  mathematics: Question[];
}

export type Subject = 'reasoning' | 'aptitude' | 'english' | 'mathematics';

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizSession {
  subject: Subject;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  startTime: number;
  isCompleted: boolean;
}

export interface QuizResult {
  subject: Subject;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  timeSpent: number;
  userAnswers: UserAnswer[];
  questions: Question[];
}

export interface QuizStats {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  subjectStats: {
    [key in Subject]: {
      quizzesTaken: number;
      averageScore: number;
      bestScore: number;
    };
  };
}
