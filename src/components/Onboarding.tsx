import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  Landmark, 
  PiggyBank, 
  Receipt
} from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface OnboardingProps {
  onComplete: (selectedTopics: string[]) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);

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

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  return (
    <div className="min-h-screen bg-secondary-dark p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Welcome to Remi</h1>
        <p className="mb-8 text-gray-400">Select the topics you'd like to learn about</p>
        
        <div className="grid grid-cols-2 gap-4">
          {topics.map(topic => (
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
          ))}
        </div>

        <button
          onClick={() => onComplete(selectedTopics)}
          disabled={selectedTopics.length === 0}
          className="mt-8 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-black transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}