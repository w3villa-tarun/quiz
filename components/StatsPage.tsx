'use client';

import { ArrowLeft, Trophy, Target, Clock, TrendingUp, Brain, Calculator, BookOpen, BarChart3 } from 'lucide-react';
import { useQuiz } from '../contexts/QuizContext';
import { Subject } from '../types';

interface StatsPageProps {
  onNavigate: (page: string) => void;
}

export default function StatsPage({ onNavigate }: StatsPageProps) {
  const { state } = useQuiz();
  const { stats, results } = state;

  const subjectIcons = {
    reasoning: Brain,
    aptitude: Calculator,
    english: BookOpen,
    mathematics: Target,
  };

  const subjectColors = {
    reasoning: 'from-purple-500 to-purple-600',
    aptitude: 'from-blue-500 to-blue-600',
    english: 'from-green-500 to-green-600',
    mathematics: 'from-red-500 to-red-600',
  };

  const subjectTitles = {
    reasoning: 'Logical Reasoning',
    aptitude: 'Quantitative Aptitude',
    english: 'English Language',
    mathematics: 'Mathematics',
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const getTotalTime = () => {
    return results.reduce((total, result) => total + result.timeSpent, 0);
  };

  const getRecentResults = () => {
    return results.slice(-5).reverse();
  };

  const getScoreDistribution = () => {
    const distribution = { excellent: 0, good: 0, average: 0, poor: 0 };
    results.forEach(result => {
      if (result.score >= 90) distribution.excellent++;
      else if (result.score >= 75) distribution.good++;
      else if (result.score >= 60) distribution.average++;
      else distribution.poor++;
    });
    return distribution;
  };

  const scoreDistribution = getScoreDistribution();

  if (stats.totalQuizzes === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
                <p className="text-gray-600">Track your learning progress</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="bg-gray-100 p-8 rounded-xl mb-6 inline-block">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Statistics Yet</h2>
              <p className="text-gray-600 mb-6">Take your first quiz to start tracking your progress!</p>
              <button
                onClick={() => onNavigate('home')}
                className="btn-primary"
              >
                Start Your First Quiz
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
              <p className="text-gray-600">Track your learning progress</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <TrendingUp className="h-6 w-6 text-purple-600" />
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
                <p className="text-sm font-medium text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-gray-900">{formatTime(getTotalTime())}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Subject Performance</h2>
            <div className="space-y-4">
              {Object.entries(stats.subjectStats).map(([subject, subjectStat]) => {
                if (subjectStat.quizzesTaken === 0) return null;
                
                const Icon = subjectIcons[subject as Subject];
                const colorClass = subjectColors[subject as Subject];
                const title = subjectTitles[subject as Subject];
                
                return (
                  <div key={subject} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${colorClass} p-2 rounded-lg`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{title}</p>
                        <p className="text-sm text-gray-600">{subjectStat.quizzesTaken} quizzes taken</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{subjectStat.averageScore}%</p>
                      <p className="text-sm text-gray-600">Best: {subjectStat.bestScore}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Score Distribution</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-700">Excellent (90-100%)</span>
                </div>
                <span className="font-bold text-gray-900">{scoreDistribution.excellent}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-700">Good (75-89%)</span>
                </div>
                <span className="font-bold text-gray-900">{scoreDistribution.good}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-gray-700">Average (60-74%)</span>
                </div>
                <span className="font-bold text-gray-900">{scoreDistribution.average}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-700">Needs Improvement (&lt;60%)</span>
                </div>
                <span className="font-bold text-gray-900">{scoreDistribution.poor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Quiz Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Correct</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {getRecentResults().map((result, index) => {
                  const Icon = subjectIcons[result.subject];
                  const colorClass = subjectColors[result.subject];
                  const title = subjectTitles[result.subject];
                  
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className={`bg-gradient-to-r ${colorClass} p-2 rounded-lg`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${
                          result.score >= 80 ? 'text-green-600' : 
                          result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {result.score}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {result.correctAnswers}/{result.totalQuestions}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {formatTime(result.timeSpent)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        Just now
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
