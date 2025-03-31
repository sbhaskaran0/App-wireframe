import React from 'react';
import { BookOpen, Calculator, ArrowRight, Brain, GraduationCap } from 'lucide-react';
import AmortizationCalculator from './widgets/AmortizationCalculator';

interface SearchResultsProps {
  query: string;
  onBack: () => void;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export default function SearchResults({ query, onBack }: SearchResultsProps) {
  // Mock response for demonstration
  const mockResponse = {
    answer: "A good credit score typically ranges from 670 to 850. Scores are considered:\n\n" +
      "- Excellent: 800-850\n" +
      "- Very Good: 740-799\n" +
      "- Good: 670-739\n" +
      "- Fair: 580-669\n" +
      "- Poor: 300-579\n\n" +
      "To maintain a good credit score:\n" +
      "1. Pay bills on time\n" +
      "2. Keep credit utilization below 30%\n" +
      "3. Maintain a mix of credit types\n" +
      "4. Limit new credit applications\n" +
      "5. Regularly monitor your credit report",
    relatedTopics: [
      "How to improve credit score",
      "Credit utilization explained",
      "Credit report basics"
    ],
    learningModule: {
      id: "credit-mastery",
      title: "Credit Score Mastery",
      description: "Master the fundamentals of credit scores and learn proven strategies to improve your creditworthiness.",
      duration: "25 mins"
    } as LearningModule
  };

  return (
    <div className="min-h-screen bg-secondary-dark px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-400 hover:text-white"
        >
          <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
          Back to Search
        </button>

        <div className="mb-8 rounded-xl bg-secondary p-6">
          <div className="mb-4 flex items-start gap-4">
            <Brain className="h-6 w-6 text-primary" />
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">{query}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-300">{mockResponse.answer}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <GraduationCap className="h-5 w-5 text-primary" />
            Recommended Learning
          </h3>
          <div className="rounded-xl bg-secondary p-6 hover:bg-secondary-light transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">{mockResponse.learningModule.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{mockResponse.learningModule.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <BookOpen className="h-4 w-4" />
                  <span>{mockResponse.learningModule.duration}</span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <BookOpen className="h-5 w-5 text-primary" />
            Related Topics
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockResponse.relatedTopics.map((topic) => (
              <button
                key={topic}
                className="rounded-lg bg-secondary p-4 text-left text-gray-300 transition-colors hover:bg-secondary-light hover:text-white"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Calculator className="h-5 w-5 text-primary" />
            Relevant Calculator
          </h3>
          <div className="rounded-xl bg-secondary p-6">
            <AmortizationCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}