import React from 'react';
import { BookOpen } from 'lucide-react';

export default function FinancialLiteracy() {
  const topics = [
    { title: 'Budgeting Basics', progress: 60 },
    { title: 'Investment 101', progress: 30 },
    { title: 'Credit Score Mastery', progress: 45 },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <span className="text-sm font-medium text-gray-600">Learning Modules</span>
      </div>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.title}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-gray-700">{topic.title}</span>
              <span className="text-gray-500">{topic.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${topic.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}