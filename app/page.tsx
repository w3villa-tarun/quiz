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

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'quiz':
        return <QuizPage onNavigate={navigate} />;
      case 'results':
        return <ResultsPage onNavigate={navigate} />;
      case 'review':
        return <ReviewPage onNavigate={navigate} />;
      case 'stats':
        return <StatsPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
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
