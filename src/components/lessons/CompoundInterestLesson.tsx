import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, DollarSign, TrendingUp, Calculator, Brain, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
}

export default function CompoundInterestLesson() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);

  const calculateCompoundInterest = (p: number, r: number, t: number) => {
    const data = [];
    for (let year = 0; year <= t; year++) {
      const amount = p * Math.pow(1 + r / 100, year);
      data.push({
        year,
        amount: Math.round(amount),
        interest: Math.round(amount - p)
      });
    }
    return data;
  };

  const compoundData = calculateCompoundInterest(principal, rate, years);

  const slides: Slide[] = [
    {
      id: 1,
      title: "What is Compound Interest?",
      icon: <Brain className="h-8 w-8 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            Compound interest is like a snowball effect for your money. It's not just interest on your
            initial investment, but interest on your interest too!
          </p>
          <div className="mt-8 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
              <div className="relative rounded-full bg-primary/30 p-8">
                <div className="rounded-full bg-primary p-6">
                  <DollarSign className="h-12 w-12 text-black" />
                </div>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-gray-400">Swipe up to continue</p>
          <div className="flex justify-center">
            <ArrowUp className="h-6 w-6 animate-bounce text-primary" />
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Power of Time",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            The longer you leave your money to grow, the more dramatic the compound effect becomes.
            Let's look at an example with $1,000 invested at 7% annual return.
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calculateCompoundInterest(1000, 7, 30)}>
                <XAxis dataKey="year" stroke="#6B7280" />
                <YAxis stroke="#6B7280" tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E2124', border: 'none' }}
                  labelStyle={{ color: '#6B7280' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#00C805"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="interest"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Try It Yourself",
      icon: <Calculator className="h-8 w-8 text-primary" />,
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-300">
            Experiment with different values to see how compound interest grows your money over time.
          </p>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Initial Investment
              </label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
              />
              <p className="mt-1 text-right text-sm text-gray-400">${principal}</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Annual Return Rate
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
              />
              <p className="mt-1 text-right text-sm text-gray-400">{rate}%</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Investment Period (Years)
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
              />
              <p className="mt-1 text-right text-sm text-gray-400">{years} years</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={compoundData}>
                <XAxis dataKey="year" stroke="#6B7280" />
                <YAxis stroke="#6B7280" tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E2124', border: 'none' }}
                  labelStyle={{ color: '#6B7280' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#00C805"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="interest"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-center text-lg font-semibold text-primary">
              After {years} years, your ${principal} becomes $
              {compoundData[compoundData.length - 1].amount.toLocaleString()}!
            </p>
          </div>
        </div>
      )
    }
  ];

  const bind = useDrag(({ movement: [dx, my], direction: [unused, dy], distance }) => {
    if (distance > 100 && dy > 0 && currentSlide > 0) {
      setCurrentSlide(current => Math.max(0, current - 1));
    } else if (distance > 100 && dy < 0 && currentSlide < slides.length - 1) {
      setCurrentSlide(current => Math.min(slides.length - 1, current + 1));
    }
  });

  return (
    <div className="min-h-screen bg-secondary-dark">
      <div className="fixed left-0 right-0 top-0 z-10 bg-secondary p-4">
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-gray-400 hover:text-white"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Module
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {slides[currentSlide].icon}
              <h1 className="text-xl font-bold text-white">{slides[currentSlide].title}</h1>
            </div>
            <span className="text-sm text-gray-400">
              {currentSlide + 1} of {slides.length}
            </span>
          </div>
          <div className="mt-4 h-1 rounded-full bg-gray-700">
            <div
              className="h-1 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pt-32">
        <div {...bind()} className="touch-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="min-h-[calc(100vh-8rem)] p-4"
            >
              {slides[currentSlide].content}
              <div className="mt-8 flex justify-end">
                {currentSlide < slides.length - 1 && (
                  <button
                    onClick={() => setCurrentSlide(current => current + 1)}
                    className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                  >
                    Next
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
