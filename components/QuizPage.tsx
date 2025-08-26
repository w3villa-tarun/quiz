'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle, Home } from 'lucide-react';
import { useQuiz } from '../contexts/QuizContext';

interface QuizPageProps {
  onNavigate: (page: string) => void;
}

export default function QuizPage({ onNavigate }: QuizPageProps) {
  const { state, answerQuestion, nextQuestion, completeQuiz, resetQuiz } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const session = state.currentSession;

  useEffect(() => {
    if (!session) {
      onNavigate('home');
      return;
    }

    if (session.isCompleted) {
      onNavigate('results');
      return;
    }

    // Reset selected answer when question changes
    const currentAnswer = session.userAnswers.find(
      a => a.questionId === session.questions[session.currentQuestionIndex].id
    );
    setSelectedAnswer(currentAnswer?.selectedAnswer ?? null);
    setQuestionStartTime(Date.now());
  }, [session?.currentQuestionIndex, session?.isCompleted, onNavigate, session]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Date.now() - questionStartTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [questionStartTime]);

  if (!session) {
    return null;
  }

  const currentQuestion = session.questions[session.currentQuestionIndex];
  const progress = ((session.currentQuestionIndex + 1) / session.questions.length) * 100;
  const isLastQuestion = session.currentQuestionIndex === session.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const timeSpent = Date.now() - questionStartTime;
    answerQuestion(currentQuestion.id, answerIndex, timeSpent);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      completeQuiz();
    } else {
      nextQuestion();
    }
  };

  const handleQuit = () => {
    if (confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
      resetQuiz();
      onNavigate('home');
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSubjectTitle = (subject: string) => {
    const titles = {
      reasoning: 'Logical Reasoning',
      aptitude: 'Quantitative Aptitude',
      english: 'English Language',
      mathematics: 'Mathematics',
    };
    return titles[subject as keyof typeof titles] || subject;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleQuit}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {getSubjectTitle(session.subject)}
                </h1>
                <p className="text-sm text-gray-600">
                  Question {session.currentQuestionIndex + 1} of {session.questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="font-medium">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                Q{session.currentQuestionIndex + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`quiz-option ${isSelected ? 'selected' : ''} group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium transition-colors ${
                      isSelected 
                        ? 'border-primary-500 bg-primary-500 text-white' 
                        : 'border-gray-300 text-gray-600 group-hover:border-primary-300'
                    }`}>
                      {isSelected ? <CheckCircle className="h-5 w-5" /> : optionLetter}
                    </div>
                    <span className="text-gray-800 font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {session.userAnswers.length > 0 && (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{session.userAnswers.length} answered</span>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {session.currentQuestionIndex > 0 && (
                <button
                  onClick={() => {
                    const newIndex = session.currentQuestionIndex - 1;
                    // This would require implementing a previous question function
                    // For now, we'll keep it simple and not allow going back
                  }}
                  className="btn-secondary flex items-center space-x-2"
                  disabled
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`flex items-center space-x-2 ${
                  selectedAnswer !== null 
                    ? 'btn-primary' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed py-2 px-4 rounded-lg'
                }`}
              >
                <span>{isLastQuestion ? 'Complete Quiz' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Navigation</h3>
          <div className="grid grid-cols-5 gap-3">
            {session.questions.map((_, index) => {
              const isAnswered = session.userAnswers.some(a => a.questionId === session.questions[index].id);
              const isCurrent = index === session.currentQuestionIndex;
              
              return (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-medium text-sm transition-colors ${
                    isCurrent
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : isAnswered
                      ? 'border-green-500 bg-green-100 text-green-700'
                      : 'border-gray-300 bg-gray-50 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
