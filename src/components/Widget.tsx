import React, { useState } from 'react';
import { Pin, X } from 'lucide-react';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  onDismiss: () => void;
}

export default function Widget({ title, children, onDismiss }: WidgetProps) {
  const [isPinned, setIsPinned] = useState(false);

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPinned(!isPinned);
            }}
            className={`rounded p-1 transition-colors ${
              isPinned ? 'text-primary hover:text-primary-dark' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Pin className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="rounded p-1 text-gray-400 transition-colors hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}