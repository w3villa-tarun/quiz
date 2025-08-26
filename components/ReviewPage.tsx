'use client';

import { useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, Home } from 'lucide-react';
import { useQuiz } from '../contexts/QuizContext';

interface ReviewPageProps {
  onNavigate: (page: string) => void;
}

export default function ReviewPage({ onNavigate }: ReviewPageProps) {
  const { state } = useQuiz();
  const session = state.currentSession;

  useEffect(() => {
    if (!session || !session.isCompleted) {
      onNavigate('home');
    }
  }, [session, onNavigate]);

  if (!session || !session.isCompleted) {
    return null;
  }

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('results')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Results</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Answer Review</h1>
                <p className="text-gray-600">{getSubjectTitle(session.subject)}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {session.questions.map((question, index) => {
            const userAnswer = session.userAnswers.find(a => a.questionId === question.id);
            const isCorrect = userAnswer?.isCorrect ?? false;
            const selectedAnswerIndex = userAnswer?.selectedAnswer;
            
            return (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Question Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        Question {index + 1}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isCorrect 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                      {question.question}
                    </h3>
                  </div>
                </div>

                {/* Answer Options */}
                <div className="space-y-3 mb-6">
                  {question.options.map((option, optionIndex) => {
                    const isUserAnswer = selectedAnswerIndex === optionIndex;
                    const isCorrectAnswer = question.correctAnswer === optionIndex;
                    const optionLetter = String.fromCharCode(65 + optionIndex);
                    
                    let optionClass = 'quiz-option';
                    if (isCorrectAnswer) {
                      optionClass += ' correct';
                    } else if (isUserAnswer && !isCorrect) {
                      optionClass += ' incorrect';
                    }
                    
                    return (
                      <div key={optionIndex} className={optionClass}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${
                            isCorrectAnswer
                              ? 'border-green-500 bg-green-500 text-white'
                              : isUserAnswer && !isCorrect
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-300 text-gray-600'
                          }`}>
                            {isCorrectAnswer ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : isUserAnswer && !isCorrect ? (
                              <XCircle className="h-5 w-5" />
                            ) : (
                              optionLetter
                            )}
                          </div>
                          <span className="text-gray-800 font-medium flex-1">{option}</span>
                          {isCorrectAnswer && (
                            <span className="text-green-600 text-sm font-medium">Correct Answer</span>
                          )}
                          {isUserAnswer && !isCorrect && (
                            <span className="text-red-600 text-sm font-medium">Your Answer</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">Explanation</h4>
                      <p className="text-blue-800 leading-relaxed">{question.explanation}</p>
                    </div>
                  </div>
                </div>

                {/* Answer Summary */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Your answer: </span>
                      <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {selectedAnswerIndex !== undefined 
                          ? `${String.fromCharCode(65 + selectedAnswerIndex)}. ${question.options[selectedAnswerIndex]}`
                          : 'Not answered'
                        }
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Correct answer: </span>
                      <span className="text-green-600">
                        {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => onNavigate('results')}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Results</span>
          </button>
          
          <button
            onClick={() => onNavigate('home')}
            className="btn-primary flex items-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </main>
    </div>
  );
}
