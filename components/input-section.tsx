'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputValues } from './dashboard'

type InputSectionProps = {
  inputs: InputValues
  onInputChange: (newInputs: Partial<InputValues>) => void
}

export function InputSection({ inputs, onInputChange }: InputSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name !== 'propertyPrice' && name !== 'loanAmount') {
      onInputChange({ [name]: parseFloat(value) })
      return
    } 

    onInputChange({ [name]: parseFloat(value), equityInvestment: inputs.propertyPrice - parseFloat(value) })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="propertyPrice">Property Purchase Price (₪)</Label>
        <Input
          id="propertyPrice"
          name="propertyPrice"
          type="number"
          value={inputs.propertyPrice}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="loanAmount">Loan Amount (₪)</Label>
        <Input
          id="loanAmount"
          name="loanAmount"
          type="number"
          value={inputs.loanAmount}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="equityInvestment">Equity Investment (₪)</Label>
        <Input
          id="equityInvestment"
          name="equityInvestment"
          type="number"
          value={inputs.propertyPrice - inputs.loanAmount}
          readOnly
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="interestRate">Interest Rate (%)</Label>
        <Input
          id="interestRate"
          name="interestRate"
          type="number"
          step="0.1"
          value={inputs.interestRate}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mortgageTerm">Mortgage Term (Years)</Label>
        <Input
          id="mortgageTerm"
          name="mortgageTerm"
          type="number"
          value={inputs.mortgageTerm}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="monthlyRentalIncome">Monthly Rental Income (₪)</Label>
        <Input
          id="monthlyRentalIncome"
          name="monthlyRentalIncome"
          type="number"
          value={inputs.monthlyRentalIncome}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="annualRentIncrease">Annual Rent Increase (%)</Label>
        <Input
          id="annualRentIncrease"
          name="annualRentIncrease"
          type="number"
          step="0.1"
          value={inputs.annualRentIncrease}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="monthlyExpenses">Monthly Expenses (₪)</Label>
        <Input
          id="monthlyExpenses"
          name="monthlyExpenses"
          type="number"
          value={inputs.monthlyExpenses}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="annualExpenseIncrease">Annual Expense Increase (%)</Label>
        <Input
          id="annualExpenseIncrease"
          name="annualExpenseIncrease"
          type="number"
          step="0.1"
          value={inputs.annualExpenseIncrease}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="annualPropertyAppreciation">Annual Property Appreciation (%)</Label>
        <Input
          id="annualPropertyAppreciation"
          name="annualPropertyAppreciation"
          type="number"
          step="0.1"
          value={inputs.annualPropertyAppreciation}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}