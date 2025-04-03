import React from 'react';
import { Target, Home, GraduationCap, Car, Briefcase, Heart } from 'lucide-react';
import Widget from './Widget';
import AmortizationCalculator from './widgets/AmortizationCalculator';
import SpendingCategories from './widgets/SpendingCategories';
import CreditUtilization from './widgets/CreditUtilization';
import BudgetingBasics from './widgets/learning/BudgetingBasics';
import Investment101 from './widgets/learning/Investment101';
import CreditMastery from './widgets/learning/CreditMastery';

interface GoalConfig {
  title: string;
  icon: React.ReactNode;
  description: string;
  widgets: {
    id: string;
    title: string;
    component: React.ComponentType;
  }[];
}

interface FinancialGoalGroupProps {
  goalId: string;
  selectedTopics: string[];
}

export default function FinancialGoalGroup({ goalId, selectedTopics }: FinancialGoalGroupProps) {
  const goals: Record<string, GoalConfig> = {
    'emergency-fund': {
      title: 'Emergency Fund',
      icon: <Target className="h-6 w-6" />,
      description: 'Build your safety net',
      widgets: [
        { id: 'budgeting', title: 'Budgeting Basics', component: BudgetingBasics },
        { id: 'spending', title: 'Spending Analysis', component: SpendingCategories },
      ],
    },
    'buy-home': {
      title: 'Home Purchase',
      icon: <Home className="h-6 w-6" />,
      description: 'Plan your home purchase',
      widgets: [
        { id: 'calculator', title: 'Mortgage Calculator', component: AmortizationCalculator },
        { id: 'credit', title: 'Credit Overview', component: CreditUtilization },
      ],
    },
    'education': {
      title: 'Education Savings',
      icon: <GraduationCap className="h-6 w-6" />,
      description: 'Save for education',
      widgets: [
        { id: 'investing', title: 'Investment Basics', component: Investment101 },
        { id: 'calculator', title: 'Education Calculator', component: AmortizationCalculator },
      ],
    },
    'vehicle': {
      title: 'Vehicle Purchase',
      icon: <Car className="h-6 w-6" />,
      description: 'Plan your vehicle purchase',
      widgets: [
        { id: 'calculator', title: 'Auto Loan Calculator', component: AmortizationCalculator },
        { id: 'credit', title: 'Credit Score', component: CreditMastery },
      ],
    },
    'retirement': {
      title: 'Retirement Planning',
      icon: <Briefcase className="h-6 w-6" />,
      description: 'Secure your future',
      widgets: [
        { id: 'investing', title: 'Investment Strategy', component: Investment101 },
        { id: 'calculator', title: 'Retirement Calculator', component: AmortizationCalculator },
      ],
    },
    'debt-free': {
      title: 'Debt Freedom',
      icon: <Heart className="h-6 w-6" />,
      description: 'Achieve financial freedom',
      widgets: [
        { id: 'credit', title: 'Credit Management', component: CreditMastery },
        { id: 'calculator', title: 'Debt Payoff Calculator', component: AmortizationCalculator },
      ],
    },
  };

  const goal = goals[goalId];
  if (!goal) return null;

  const relevantWidgets = goal.widgets.filter(widget => 
    selectedTopics.includes(widget.id) || widget.id === 'calculator'
  );

  if (relevantWidgets.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          {goal.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{goal.title}</h2>
          <p className="text-gray-400">{goal.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {relevantWidgets.map((widget) => (
          <div
            key={widget.id}
            className="rounded-xl bg-white/5 p-6 backdrop-blur-lg transition-all duration-200"
          >
            <Widget title={widget.title} onDismiss={() => {}}>
              <widget.component />
            </Widget>
          </div>
        ))}
      </div>
    </div>
  );
}