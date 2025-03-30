import React from 'react';
import { CreditCard } from 'lucide-react';

export default function CreditUtilization() {
  const cards = [
    { name: 'Main Card', limit: 10000, used: 2500 },
    { name: 'Rewards Card', limit: 5000, used: 1000 },
    { name: 'Business Card', limit: 15000, used: 4500 },
  ];

  const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);
  const totalUsed = cards.reduce((sum, card) => sum + card.used, 0);
  const overallUtilization = (totalUsed / totalLimit) * 100;

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <CreditCard className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-gray-300">Credit Utilization</span>
      </div>
      <div className="mb-6 rounded-lg bg-secondary-light p-4">
        <p className="text-sm font-medium text-gray-300">Overall Utilization</p>
        <p className="text-2xl font-bold text-primary">{overallUtilization.toFixed(1)}%</p>
      </div>
      <div className="space-y-4">
        {cards.map((card) => {
          const utilization = (card.used / card.limit) * 100;
          return (
            <div key={card.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-white">{card.name}</span>
                <span className="text-gray-400">{utilization.toFixed(1)}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary-light">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    utilization > 30 ? 'bg-red-500' : 'bg-primary'
                  }`}
                  style={{ width: `${utilization}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>${card.used.toLocaleString()}</span>
                <span>${card.limit.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}