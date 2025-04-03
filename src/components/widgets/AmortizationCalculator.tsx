import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  month: number;
  balance: number;
  principal: number;
  interest: number;
}

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState('200000');
  const [interestRate, setInterestRate] = useState('3.5');
  const [loanTerm, setLoanTerm] = useState('30');

  const monthlyPayment = calculateMonthlyPayment(
    parseFloat(loanAmount),
    parseFloat(interestRate),
    parseInt(loanTerm)
  );

  const amortizationSchedule = calculateAmortizationSchedule(
    parseFloat(loanAmount),
    parseFloat(interestRate),
    parseInt(loanTerm)
  );

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <Calculator className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-gray-300">Loan Calculator</span>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">Loan Amount</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full rounded border border-gray-700 bg-secondary-light px-3 py-2 text-sm text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full rounded border border-gray-700 bg-secondary-light px-3 py-2 text-sm text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">Loan Term (years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full rounded border border-gray-700 bg-secondary-light px-3 py-2 text-sm text-white"
          />
        </div>
        <div className="mt-4 rounded-lg bg-secondary-light p-4">
          <p className="text-sm font-medium text-gray-300">Monthly Payment</p>
          <p className="text-2xl font-bold text-primary">
            ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={amortizationSchedule}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                tickFormatter={(value) => `Year ${Math.floor(value/12)}`}
              />
              <YAxis 
                stroke="#6B7280"
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E2124', border: 'none' }}
                labelStyle={{ color: '#6B7280' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#00C805" 
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="principal" 
                stroke="#3B82F6" 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  return isNaN(monthlyPayment) ? 0 : monthlyPayment;
}

function calculateAmortizationSchedule(
  principal: number,
  annualRate: number,
  years: number
): DataPoint[] {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  
  const schedule: DataPoint[] = [];
  let balance = principal;
  let totalPrincipal = 0;

  for (let month = 0; month <= numberOfPayments; month += 12) {
    const interest = balance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    totalPrincipal += principalPayment;
    balance -= principalPayment;

    schedule.push({
      month,
      balance: Math.max(0, balance),
      principal: totalPrincipal,
      interest: interest
    });
  }

  return schedule;
}