'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { QuizSession, QuizResult, Subject, Question, UserAnswer, QuizStats } from '../types';
import questionsData from '../data/questions.json';

interface QuizState {
  currentSession: QuizSession | null;
  results: QuizResult[];
  stats: QuizStats;
  isLoading: boolean;
}

type QuizAction =
  | { type: 'START_QUIZ'; payload: { subject: Subject; questions: Question[] } }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: number; selectedAnswer: number; timeSpent: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' }
  | { type: 'LOAD_RESULTS'; payload: QuizResult[] }
  | { type: 'LOAD_STATS'; payload: QuizStats }
  | { type: 'SET_LOADING'; payload: boolean };

const initialStats: QuizStats = {
  totalQuizzes: 0,
  averageScore: 0,
  bestScore: 0,
  subjectStats: {
    reasoning: { quizzesTaken: 0, averageScore: 0, bestScore: 0 },
    aptitude: { quizzesTaken: 0, averageScore: 0, bestScore: 0 },
    english: { quizzesTaken: 0, averageScore: 0, bestScore: 0 },
    mathematics: { quizzesTaken: 0, averageScore: 0, bestScore: 0 },
  },
};

const initialState: QuizState = {
  currentSession: null,
  results: [],
  stats: initialStats,
  isLoading: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...state,
        currentSession: {
          subject: action.payload.subject,
          questions: action.payload.questions,
          currentQuestionIndex: 0,
          userAnswers: [],
          startTime: Date.now(),
          isCompleted: false,
        },
      };

    case 'ANSWER_QUESTION':
      if (!state.currentSession) return state;
      
      const currentQuestion = state.currentSession.questions[state.currentSession.currentQuestionIndex];
      const isCorrect = action.payload.selectedAnswer === currentQuestion.correctAnswer;
      
      const newAnswer: UserAnswer = {
        questionId: action.payload.questionId,
        selectedAnswer: action.payload.selectedAnswer,
        isCorrect,
        timeSpent: action.payload.timeSpent,
      };

      const updatedAnswers = [...state.currentSession.userAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex(a => a.questionId === action.payload.questionId);
      
      if (existingAnswerIndex >= 0) {
        updatedAnswers[existingAnswerIndex] = newAnswer;
      } else {
        updatedAnswers.push(newAnswer);
      }

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          userAnswers: updatedAnswers,
        },
      };

    case 'NEXT_QUESTION':
      if (!state.currentSession) return state;
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          currentQuestionIndex: Math.min(
            state.currentSession.currentQuestionIndex + 1,
            state.currentSession.questions.length - 1
          ),
        },
      };

    case 'COMPLETE_QUIZ':
      if (!state.currentSession) return state;
      
      const correctAnswers = state.currentSession.userAnswers.filter(a => a.isCorrect).length;
      const totalQuestions = state.currentSession.questions.length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      const timeSpent = Date.now() - state.currentSession.startTime;

      const result: QuizResult = {
        subject: state.currentSession.subject,
        totalQuestions,
        correctAnswers,
        incorrectAnswers: totalQuestions - correctAnswers,
        score,
        timeSpent,
        userAnswers: state.currentSession.userAnswers,
        questions: state.currentSession.questions,
      };

      const newResults = [...state.results, result];
      
      // Update stats
      const subjectResults = newResults.filter(r => r.subject === result.subject);
      const allScores = newResults.map(r => r.score);
      
      const newStats: QuizStats = {
        totalQuizzes: newResults.length,
        averageScore: Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length),
        bestScore: Math.max(...allScores),
        subjectStats: {
          ...state.stats.subjectStats,
          [result.subject]: {
            quizzesTaken: subjectResults.length,
            averageScore: Math.round(subjectResults.reduce((a, b) => a + b.score, 0) / subjectResults.length),
            bestScore: Math.max(...subjectResults.map(r => r.score)),
          },
        },
      };

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          isCompleted: true,
        },
        results: newResults,
        stats: newStats,
      };

    case 'RESET_QUIZ':
      return {
        ...state,
        currentSession: null,
      };

    case 'LOAD_RESULTS':
      return {
        ...state,
        results: action.payload,
      };

    case 'LOAD_STATS':
      return {
        ...state,
        stats: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  startQuiz: (subject: Subject) => void;
  answerQuestion: (questionId: number, selectedAnswer: number, timeSpent: number) => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
} | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedResults = localStorage.getItem('quiz-results');
    const savedStats = localStorage.getItem('quiz-stats');
    
    if (savedResults) {
      dispatch({ type: 'LOAD_RESULTS', payload: JSON.parse(savedResults) });
    }
    
    if (savedStats) {
      dispatch({ type: 'LOAD_STATS', payload: JSON.parse(savedStats) });
    }
  }, []);

  // Save data to localStorage when results or stats change
  useEffect(() => {
    if (state.results.length > 0) {
      localStorage.setItem('quiz-results', JSON.stringify(state.results));
    }
  }, [state.results]);

  useEffect(() => {
    if (state.stats.totalQuizzes > 0) {
      localStorage.setItem('quiz-stats', JSON.stringify(state.stats));
    }
  }, [state.stats]);

  const startQuiz = (subject: Subject) => {
    const questions = questionsData[subject] as Question[];
    dispatch({ type: 'START_QUIZ', payload: { subject, questions } });
  };

  const answerQuestion = (questionId: number, selectedAnswer: number, timeSpent: number) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, selectedAnswer, timeSpent } });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const completeQuiz = () => {
    dispatch({ type: 'COMPLETE_QUIZ' });
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
        startQuiz,
        answerQuestion,
        nextQuestion,
        completeQuiz,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
