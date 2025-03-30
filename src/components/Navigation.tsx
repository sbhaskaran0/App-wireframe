import React from 'react';
import { Home, Search, BookOpen, User } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-secondary px-6 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <button className="flex flex-col items-center gap-1 text-primary">
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary">
          <Search className="h-6 w-6" />
          <span className="text-xs">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary">
          <BookOpen className="h-6 w-6" />
          <span className="text-xs">Learn</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary">
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );
}