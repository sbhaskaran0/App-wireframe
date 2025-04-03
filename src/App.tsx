import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import SearchBar from './components/SearchBar';
import Navigation from './components/Navigation';
import LearnFeed from './components/learn/LearnFeed';
import Onboarding from './components/Onboarding';
import LessonView from './components/LessonView';
import SearchResults from './components/SearchResults';
import FinancialGoalGroup from './components/FinancialGoalGroup';
import CompoundInterestLesson from './components/lessons/CompoundInterestLesson';

export default function App() {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const handleOnboardingComplete = (topics: string[], goals: string[]) => {
    setSelectedTopics(topics);
    setSelectedGoals(goals);
    setIsOnboarding(false);
  };

  if (isOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-secondary-dark pb-20">
        <header className="bg-secondary sticky top-0 z-10 border-b border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-white">Remi</h1>
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route 
            path="/" 
            element={
              <main>
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                  <div className="mb-12 flex flex-col items-center text-center">
                    <h2 className="mb-4 text-4xl font-bold text-white">
                      Your AI Financial Assistant
                    </h2>
                    <p className="mb-8 max-w-2xl text-lg text-gray-400">
                      Ask anything about personal finance, from budgeting basics to investment strategies
                    </p>
                    <SearchBar onSearch={(query) => setSearchQuery(query)} />
                  </div>

                  {selectedGoals.map((goal) => (
                    <FinancialGoalGroup 
                      key={goal} 
                      goalId={goal} 
                      selectedTopics={selectedTopics}
                    />
                  ))}
                </div>
              </main>
            } 
          />
          <Route path="/learn" element={<LearnFeed />} />
          <Route 
            path="/search" 
            element={
              searchQuery ? (
                <SearchResults query={searchQuery} onBack={() => setSearchQuery(null)} />
              ) : (
                <div className="p-8">
                  <SearchBar onSearch={(query) => setSearchQuery(query)} />
                </div>
              )
            } 
          />
          <Route path="/lesson/:id" element={<LessonView moduleId="budgeting" onBack={() => {}} />} />
          <Route path="/lesson/compound-interest" element={<CompoundInterestLesson />} />
        </Routes>

        <Navigation />
      </div>
    </Router>
  );
}