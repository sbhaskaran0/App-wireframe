import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import SearchBar from './components/SearchBar';
import Navigation from './components/Navigation';
import Widget from './components/Widget';
import BudgetingBasics from './components/widgets/learning/BudgetingBasics';
import Investment101 from './components/widgets/learning/Investment101';
import CreditMastery from './components/widgets/learning/CreditMastery';
import AmortizationCalculator from './components/widgets/AmortizationCalculator';
import SpendingCategories from './components/widgets/SpendingCategories';
import CreditUtilization from './components/widgets/CreditUtilization';
import Onboarding from './components/Onboarding';
import LessonView from './components/LessonView';

type Category = {
  title: string;
  widgets: WidgetConfig[];
};

type WidgetConfig = {
  id: string;
  title: string;
  component: React.ComponentType;
};

function App() {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([]);
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);

  const categories: Category[] = [
    {
      title: 'Learning',
      widgets: [
        { id: 'budgeting', title: 'Budgeting Basics', component: BudgetingBasics },
        { id: 'investing', title: 'Investment 101', component: Investment101 },
        { id: 'credit-mastery', title: 'Credit Score Mastery', component: CreditMastery },
      ],
    },
    {
      title: 'Calculators',
      widgets: [
        { id: 'calculator', title: 'Loan Calculator', component: AmortizationCalculator },
        { id: 'spending', title: 'Spending Analysis', component: SpendingCategories },
        { id: 'credit', title: 'Credit Overview', component: CreditUtilization },
      ],
    },
  ];

  const handleOnboardingComplete = (topics: string[]) => {
    setSelectedTopics(topics);
    setActiveWidgets([...topics, 'calculator', 'spending', 'credit']);
    setIsOnboarding(false);
  };

  const handleDismiss = (widgetId: string) => {
    setActiveWidgets(activeWidgets.filter((w) => w !== widgetId));
  };

  const handleModuleClick = (moduleId: string) => {
    setCurrentLesson(moduleId);
  };

  if (isOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (currentLesson) {
    return <LessonView moduleId={currentLesson} onBack={() => setCurrentLesson(null)} />;
  }

  return (
    <div className="min-h-screen bg-secondary-dark pb-20">
      <header className="bg-secondary sticky top-0 z-10 border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-white">Remi</h1>
            </div>
            <SearchBar />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <div key={category.title} className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-white">{category.title}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {category.widgets.map((widget) => (
                activeWidgets.includes(widget.id) && (
                  <div
                    key={widget.id}
                    onClick={() => category.title === 'Learning' && handleModuleClick(widget.id)}
                    className={`rounded-xl bg-white/5 p-6 backdrop-blur-lg transition-all duration-200 ${
                      category.title === 'Learning' ? 'cursor-pointer hover:bg-white/10' : ''
                    }`}
                  >
                    <Widget
                      title={widget.title}
                      onDismiss={() => handleDismiss(widget.id)}
                    >
                      <widget.component />
                    </Widget>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </main>

      <Navigation />
    </div>
  );
}

export default App;