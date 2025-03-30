import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState('200000');
  const [interestRate, setInterestRate] = useState('3.5');
  const [loanTerm, setLoanTerm] = useState('30');

  const monthlyPayment = calculateMonthlyPayment(
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