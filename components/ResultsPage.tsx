'use client';

import { useEffect } from 'react';
import { Trophy, Target, Clock, CheckCircle, XCircle, Home, Eye, RotateCcw } from 'lucide-react';
import { useQuiz } from '../contexts/QuizContext';

interface ResultsPageProps {
  onNavigate: (page: string) => void;
}

export default function ResultsPage({ onNavigate }: ResultsPageProps) {
  const { state, resetQuiz } = useQuiz();
  const session = state.currentSession;

  useEffect(() => {
    if (!session || !session.isCompleted) {
      onNavigate('home');
    }
  }, [session, onNavigate]);

  if (!session || !session.isCompleted) {
    return null;
  }

  const result = state.results[state.results.length - 1];
  const { score, correctAnswers, totalQuestions, timeSpent } = result;
  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! 🎉';
    if (score >= 80) return 'Excellent work! 👏';
    if (score >= 70) return 'Good job! 👍';
    if (score >= 60) return 'Not bad, keep practicing! 💪';
    return 'Keep learning, you\'ll improve! 📚';
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

  const handleRetakeQuiz = () => {
    resetQuiz();
    onNavigate('home');
  };

  const handleReviewAnswers = () => {
    onNavigate('review');
  };

  const handleGoHome = () => {
    resetQuiz();
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quiz Results</h1>
              <p className="text-gray-600">{getSubjectTitle(session.subject)}</p>
            </div>
            <button
              onClick={handleGoHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8 animate-bounce-in">
          <div className="text-center">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
                score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
              } mb-4`}>
                <Trophy className={`h-12 w-12 ${
                  score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-lg text-gray-600">{getScoreMessage(score)}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-3">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">Your Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}%</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">Correct Answers</p>
                <p className="text-3xl font-bold text-green-600">{correctAnswers}/{totalQuestions}</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">Time Taken</p>
                <p className="text-3xl font-bold text-purple-600">{formatTime(timeSpent)}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Performance</span>
                <span>{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                    score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Question Summary</h3>
          <div className="grid grid-cols-1 gap-4">
            {session.questions.map((question, index) => {
              const userAnswer = session.userAnswers.find(a => a.questionId === question.id);
              const isCorrect = userAnswer?.isCorrect ?? false;
              
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                          Q{index + 1}
                        </span>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          isCorrect ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium mb-2">{question.question}</p>
                      <div className="text-sm text-gray-600">
                        <p>Your answer: <span className="font-medium">
                          {userAnswer ? question.options[userAnswer.selectedAnswer] : 'Not answered'}
                        </span></p>
                        {!isCorrect && (
                          <p>Correct answer: <span className="font-medium text-green-700">
                            {question.options[question.correctAnswer]}
                          </span></p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReviewAnswers}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Eye className="h-5 w-5" />
            <span>Review Answers</span>
          </button>
          
          <button
            onClick={handleRetakeQuiz}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Retake Quiz</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </main>
    </div>
  );
}
