'use client';

import { useState } from 'react';
import { QuizProvider } from '../contexts/QuizContext';
import HomePage from '../components/HomePage';
import QuizPage from '../components/QuizPage';
import ResultsPage from '../components/ResultsPage';
import ReviewPage from '../components/ReviewPage';
import StatsPage from '../components/StatsPage';

type Page = 'home' | 'quiz' | 'results' | 'review' | 'stats';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'quiz':
        return <QuizPage onNavigate={setCurrentPage} />;
      case 'results':
        return <ResultsPage onNavigate={setCurrentPage} />;
      case 'review':
        return <ReviewPage onNavigate={setCurrentPage} />;
      case 'stats':
        return <StatsPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <QuizProvider>
      <div className="min-h-screen">
        {renderPage()}
      </div>
    </QuizProvider>
  );
}
