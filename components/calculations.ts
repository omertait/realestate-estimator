'use client'

import { InputValues } from './dashboard'

export type YearlyProjection = {
  year: number
  rentalIncome: number
  expenses: number
  maintenance: number
  propertyTax: number
  insurance: number
  otherExpenses: number
  noi: number
  loanPayment: number
  cashFlow: number
  propertyValue: number
  loanBalance: number
  equity: number
  roi: number
  netWorth: number
}

export function calculateProjections(inputs: InputValues): YearlyProjection[] {
  const projections: YearlyProjection[] = []
  
  const monthlyInterestRate = inputs.interestRate / 100 / 12
  const totalPayments = inputs.mortgageTerm * 12
  const monthlyPayment = (inputs.loanAmount * monthlyInterestRate) / 
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))
  
  let loanBalance = inputs.loanAmount

  for (let year = 1; year <= inputs.mortgageTerm; year++) {
    const rentalIncome = inputs.monthlyRentalIncome * 12 * Math.pow(1 + inputs.annualRentIncrease / 100, year - 1)
    const totalExpenses = inputs.monthlyExpenses * 12 * Math.pow(1 + inputs.annualExpenseIncrease / 100, year - 1)

    // Breakdown of expenses
    const maintenance = totalExpenses * 0.4
    const propertyTax = totalExpenses * 0.3
    const insurance = totalExpenses * 0.2
    const otherExpenses = totalExpenses * 0.1

    const noi = rentalIncome - totalExpenses
    const loanPayment = monthlyPayment * 12
    const cashFlow = noi - loanPayment
    const propertyValue = inputs.propertyPrice * Math.pow(1 + inputs.annualPropertyAppreciation / 100, year - 1)

    // Calculate remaining loan balance for the year
    for (let month = 1; month <= 12; month++) {
      const interestPayment = loanBalance * monthlyInterestRate
      const principalPayment = monthlyPayment - interestPayment
      loanBalance -= principalPayment
    }

    const equity = propertyValue - loanBalance
    const equityGrowth = equity - (year === 1 ? inputs.equityInvestment : projections[year - 2].equity)
    const roi = (cashFlow + equityGrowth) / inputs.equityInvestment * 100
    const netWorth = equity

    projections.push({
      year,
      rentalIncome,
      expenses: totalExpenses,
      maintenance,
      propertyTax,
      insurance,
      otherExpenses,
      noi,
      loanPayment,
      cashFlow,
      propertyValue,
      loanBalance,
      equity,
      roi,
      netWorth
    })
  }

  return projections
}

export type MonthlyStats = {
  rentalIncome: number
  expenses: number
  mortgagePayment: number
  monthlyProfit: number
}

export function calculateMonthlyStats(inputs: InputValues, year: number): MonthlyStats { 
  const monthlyInterestRate = inputs.interestRate / 100 / 12
  const totalPayments = inputs.mortgageTerm * 12
  const monthlyMortgagePayment = (inputs.loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1)
  
  const rentalIncome = inputs.monthlyRentalIncome * Math.pow(1 + inputs.annualRentIncrease / 100, year - 1)
  const expenses = inputs.monthlyExpenses * Math.pow(1 + inputs.annualExpenseIncrease / 100, year - 1)
  const monthlyProfit = rentalIncome - expenses - monthlyMortgagePayment

  const monthlyStats: MonthlyStats = {
    rentalIncome,
    expenses,
    mortgagePayment: monthlyMortgagePayment,
    monthlyProfit
  }

  return monthlyStats
}

export const allMonthlyStats = (inputs: InputValues): MonthlyStats[] => {
  return Array.from({ length: inputs.mortgageTerm }, (_, i) => calculateMonthlyStats(inputs, i + 1))
}