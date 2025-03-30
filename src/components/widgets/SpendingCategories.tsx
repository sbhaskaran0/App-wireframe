import React from 'react';
import { PieChart } from 'lucide-react';

export default function SpendingCategories() {
  const categories = [
    { name: 'Housing', amount: 2000, color: 'bg-primary' },
    { name: 'Transportation', amount: 400, color: 'bg-blue-500' },
    { name: 'Food', amount: 600, color: 'bg-purple-500' },
    { name: 'Utilities', amount: 300, color: 'bg-yellow-500' },
    { name: 'Entertainment', amount: 200, color: 'bg-red-500' },
  ];

  const total = categories.reduce((sum, category) => sum + category.amount, 0);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <PieChart className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-gray-300">Monthly Spending</span>
      </div>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-white">{category.name}</span>
              <span className="text-gray-400">${category.amount}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary-light">
              <div
                className={`h-2 rounded-full ${category.color}`}
                style={{ width: `${(category.amount / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <span className="text-sm font-medium text-gray-300">Total: ${total}</span>
      </div>
    </div>
  );
}