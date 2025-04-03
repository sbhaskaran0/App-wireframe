import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Investment101() {
  const progress = 30;
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <TrendingUp className="h-5 w-5 text-primary" />
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
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Current Lesson</h4>
          <p className="text-white">Understanding Compound Interest</p>
          <button 
            onClick={() => navigate('/lesson/compound-interest')}
            className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-primary-dark"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}