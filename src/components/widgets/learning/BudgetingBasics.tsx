import React from 'react';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export default function BudgetingBasics() {
  const navigate = useNavigate();
  const progress = 60;

  const lessons: Lesson[] = [
    {
      id: 'budget-basics',
      title: 'Understanding Budget Fundamentals',
      description: 'Learn the core principles of budgeting',
      duration: '5 min'
    },
    {
      id: 'income-tracking',
      title: 'Income Tracking Strategies',
      description: 'Master effective income tracking methods',
      duration: '4 min'
    },
    {
      id: 'expense-categories',
      title: 'Categorizing Expenses',
      description: 'Organize your spending effectively',
      duration: '6 min'
    }
  ];

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <BookOpen className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-gray-300">Module Progress</span>
      </div>
      <div className="space-y-4">
        <div className="mb-1 flex justify-between text-sm">
          <span className="font-medium text-white">Course Progress</span>
          <span className="text-gray-400">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary-light">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              className="cursor-pointer rounded-lg bg-secondary p-4 transition-colors hover:bg-secondary-light"
            >
              <h4 className="mb-1 font-medium text-white">{lesson.title}</h4>
              <p className="mb-2 text-sm text-gray-400">{lesson.description}</p>
              <div className="flex items-center text-sm text-gray-400">
                <BookOpen className="mr-2 h-4 w-4" />
                {lesson.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}