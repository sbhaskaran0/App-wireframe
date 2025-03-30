import React from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  completed: boolean;
}

interface LessonViewProps {
  moduleId: string;
  onBack: () => void;
}

export default function LessonView({ moduleId, onBack }: LessonViewProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = React.useState(0);

  const lessons: Lesson[] = React.useMemo(() => {
    switch (moduleId) {
      case 'budgeting':
        return [
          {
            id: 'budget-basics',
            title: 'Understanding Budget Fundamentals',
            content: 'Learn the core principles of budgeting and why it matters for your financial health.',
            completed: false
          },
          {
            id: 'income-tracking',
            title: 'Income Tracking Strategies',
            content: 'Discover effective methods to track your income and understand your earning patterns.',
            completed: false
          },
          {
            id: 'expense-categories',
            title: 'Categorizing Expenses',
            content: 'Master the art of organizing your expenses into meaningful categories.',
            completed: false
          }
        ];
      case 'investing':
        return [
          {
            id: 'investment-basics',
            title: 'Investment Fundamentals',
            content: 'Understand the basics of investing and different investment vehicles.',
            completed: false
          },
          {
            id: 'risk-management',
            title: 'Risk Management',
            content: 'Learn how to assess and manage investment risks effectively.',
            completed: false
          }
        ];
      default:
        return [];
    }
  }, [moduleId]);

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-secondary-dark p-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-gray-400 hover:text-white"
      >
        <ChevronLeft className="mr-1 h-5 w-5" />
        Back to Modules
      </button>

      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Lesson {currentLessonIndex + 1} of {lessons.length}
            </h2>
            <span className="text-sm text-gray-400">
              {Math.round((currentLessonIndex / lessons.length) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${(currentLessonIndex / lessons.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8 rounded-xl bg-secondary p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">{currentLesson.title}</h3>
          <p className="text-gray-400">{currentLesson.content}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentLessonIndex(i => i - 1)}
            disabled={currentLessonIndex === 0}
            className="rounded-lg bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentLessonIndex < lessons.length - 1) {
                setCurrentLessonIndex(i => i + 1);
              } else {
                onBack();
              }
            }}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-black transition-colors hover:bg-primary-dark"
          >
            {currentLessonIndex < lessons.length - 1 ? 'Next Lesson' : 'Complete Module'}
          </button>
        </div>

        <div className="mt-8">
          <h4 className="mb-4 text-sm font-medium text-gray-400">Module Progress</h4>
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className={`mb-2 flex items-center rounded-lg p-3 ${
                index === currentLessonIndex
                  ? 'bg-secondary'
                  : index < currentLessonIndex
                  ? 'bg-secondary/50'
                  : 'bg-secondary-dark'
              }`}
            >
              {index < currentLessonIndex ? (
                <CheckCircle className="mr-3 h-5 w-5 text-primary" />
              ) : (
                <div className={`mr-3 h-5 w-5 rounded-full border ${
                  index === currentLessonIndex ? 'border-primary' : 'border-gray-600'
                }`} />
              )}
              <span className={`text-sm ${
                index <= currentLessonIndex ? 'text-white' : 'text-gray-500'
              }`}>
                {lesson.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}