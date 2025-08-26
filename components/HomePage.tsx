'use client';

import { Brain, Calculator, BookOpen, Target, BarChart3, Trophy, Clock, Users } from 'lucide-react';
import { useQuiz } from '../contexts/QuizContext';
import { Subject } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const subjects = [
  {
    id: 'reasoning' as Subject,
    title: 'Logical Reasoning',
    description: 'Test your logical thinking and problem-solving abilities',
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    id: 'aptitude' as Subject,
    title: 'Quantitative Aptitude',
    description: 'Numerical ability and mathematical problem solving',
    icon: Calculator,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'english' as Subject,
    title: 'English Language',
    description: 'Grammar, vocabulary, and language comprehension',
    icon: BookOpen,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'mathematics' as Subject,
    title: 'Mathematics',
    description: 'Core mathematical concepts and calculations',
    icon: Target,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const { startQuiz, state } = useQuiz();

  const handleStartQuiz = (subject: Subject) => {
    startQuiz(subject);
    onNavigate('quiz');
  };

  const stats = state.stats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Aptitude Quiz App</h1>
                <p className="text-gray-600">Master your skills with comprehensive practice</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('stats')}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <BarChart3 className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Statistics</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        {stats.totalQuizzes > 0 && (
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Trophy className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalQuizzes}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Best Score</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.bestScore}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Practice Time</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(state.results.reduce((acc, r) => acc + r.timeSpent, 0) / 60000)}m
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subject Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Subject</h2>
          <p className="text-gray-600 mb-8">Select a subject to start practicing. Each quiz contains 5 carefully crafted questions.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              const subjectStats = stats.subjectStats[subject.id];
              
              return (
                <div
                  key={subject.id}
                  className={`${subject.bgColor} ${subject.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleStartQuiz(subject.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`bg-gradient-to-r ${subject.color} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{subject.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{subject.description}</p>
                    
                    {subjectStats.quizzesTaken > 0 && (
                      <div className="w-full bg-white rounded-lg p-3 mt-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Quizzes: {subjectStats.quizzesTaken}</span>
                          <span>Best: {subjectStats.bestScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${subject.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${subjectStats.averageScore}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 text-center">
                          Avg: {subjectStats.averageScore}%
                        </p>
                      </div>
                    )}
                    
                    <button className="mt-4 w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-200 transition-colors duration-200">
                      Start Quiz
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Quiz App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Coverage</h3>
              <p className="text-gray-600">Four essential subjects with carefully curated questions covering all important topics.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Explanations</h3>
              <p className="text-gray-600">Every question comes with detailed explanations to help you understand the concepts.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Track your performance over time with detailed statistics and progress reports.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
