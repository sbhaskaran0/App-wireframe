import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const SUGGESTED_SEARCHES = [
  "How do I create a budget?",
  "What's a good credit score?",
  "How to start investing?",
  "Emergency fund basics",
  "Debt payoff strategies",
  "First time home buying",
  "Understanding credit cards",
  "Retirement planning basics"
];

export default function SearchBar({ onSearch }: { onSearch?: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about personal finance..."
          className="w-full rounded-xl border border-gray-700 bg-secondary-light py-4 pl-12 pr-12 text-lg text-white placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary-dark"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>
      
      <div className="mt-4 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0 md:gap-2 scrollbar-hide">
          {SUGGESTED_SEARCHES.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex-none rounded-full bg-secondary px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-secondary-light hover:text-white mr-2 md:mr-0 whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}