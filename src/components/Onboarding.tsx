import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  Landmark, 
  PiggyBank, 
  Receipt,
  Target,
  Home,
  GraduationCap,
  Car,
  Briefcase,
  Heart
} from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface Goal {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  relatedWidgets: string[];
}

interface OnboardingProps {
  onComplete: (selectedTopics: string[], selectedGoals: string[]) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<'topics' | 'goals'>('topics');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const topics: Topic[] = [
    {
      id: 'budgeting',
      title: 'Budgeting',
      icon: <Wallet className="h-8 w-8" />,
      description: 'Learn to create and stick to a budget'
    },
    {
      id: 'investing',
      title: 'Investing',
      icon: <TrendingUp className="h-8 w-8" />,
      description: 'Start your investment journey'
    },
    {
      id: 'credit',
      title: 'Credit Building',
      icon: <CreditCard className="h-8 w-8" />,
      description: 'Understand and improve your credit score'
    },
    {
      id: 'banking',
      title: 'Banking',
      icon: <Landmark className="h-8 w-8" />,
      description: 'Master modern banking concepts'
    },
    {
      id: 'saving',
      title: 'Saving',
      icon: <PiggyBank className="h-8 w-8" />,
      description: 'Develop effective saving habits'
    },
    {
      id: 'taxes',
      title: 'Taxes',
      icon: <Receipt className="h-8 w-8" />,
      description: 'Navigate tax basics and planning'
    }
  ];

  const goals: Goal[] = [
    {
      id: 'emergency-fund',
      title: 'Build Emergency Fund',
      icon: <Target className="h-8 w-8" />,
      description: 'Save 3-6 months of expenses',
      relatedWidgets: ['budgeting', 'saving', 'calculator']
    },
    {
      id: 'buy-home',
      title: 'Buy a Home',
      icon: <Home className="h-8 w-8" />,
      description: 'Save for down payment and understand mortgages',
      relatedWidgets: ['calculator', 'credit', 'investing']
    },
    {
      id: 'education',
      title: 'Education Savings',
      icon: <GraduationCap className="h-8 w-8" />,
      description: 'Plan for education expenses',
      relatedWidgets: ['investing', 'saving', 'calculator']
    },
    {
      id: 'vehicle',
      title: 'Purchase Vehicle',
      icon: <Car className="h-8 w-8" />,
      description: 'Save and plan for vehicle purchase',
      relatedWidgets: ['calculator', 'credit', 'budgeting']
    },
    {
      id: 'retirement',
      title: 'Plan Retirement',
      icon: <Briefcase className="h-8 w-8" />,
      description: 'Build long-term retirement savings',
      relatedWidgets: ['investing', 'calculator', 'saving']
    },
    {
      id: 'debt-free',
      title: 'Become Debt Free',
      icon: <Heart className="h-8 w-8" />,
      description: 'Create a debt payoff strategy',
      relatedWidgets: ['credit', 'budgeting', 'calculator']
    }
  ];

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (step === 'topics' && selectedTopics.length > 0) {
      setStep('goals');
    } else if (step === 'goals' && selectedGoals.length > 0) {
      onComplete(selectedTopics, selectedGoals);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-dark p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Welcome to Remi</h1>
        <p className="mb-8 text-gray-400">
          {step === 'topics' 
            ? "Select the topics you'd like to learn about"
            : 'What are your financial goals?'}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {step === 'topics' ? (
            topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`flex flex-col items-center rounded-xl p-6 text-center transition-all duration-200 ${
                  selectedTopics.includes(topic.id)
                    ? 'bg-primary text-black'
                    : 'bg-secondary text-white hover:bg-secondary-light'
                }`}
              >
                <div className={`mb-3 ${
                  selectedTopics.includes(topic.id) ? 'text-black' : 'text-primary'
                }`}>
                  {topic.icon}
                </div>
                <h3 className="mb-2 font-semibold">{topic.title}</h3>
                <p className={`text-sm ${
                  selectedTopics.includes(topic.id) ? 'text-black/80' : 'text-gray-400'
                }`}>
                  {topic.description}
                </p>
              </button>
            ))
          ) : (
            goals.map(goal => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`flex flex-col items-center rounded-xl p-6 text-center transition-all duration-200 ${
                  selectedGoals.includes(goal.id)
                    ? 'bg-primary text-black'
                    : 'bg-secondary text-white hover:bg-secondary-light'
                }`}
              >
                <div className={`mb-3 ${
                  selectedGoals.includes(goal.id) ? 'text-black' : 'text-primary'
                }`}>
                  {goal.icon}
                </div>
                <h3 className="mb-2 font-semibold">{goal.title}</h3>
                <p className={`text-sm ${
                  selectedGoals.includes(goal.id) ? 'text-black/80' : 'text-gray-400'
                }`}>
                  {goal.description}
                </p>
              </button>
            ))
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          {step === 'goals' && (
            <button
              onClick={() => setStep('topics')}
              className="rounded-lg border border-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={(step === 'topics' && selectedTopics.length === 0) || 
                     (step === 'goals' && selectedGoals.length === 0)}
            className="ml-auto rounded-lg bg-primary px-6 py-3 font-semibold text-black transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step === 'topics' ? 'Next' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
}