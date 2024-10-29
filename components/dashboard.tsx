"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InputSection } from './input-section'
import { ProjectionsTable } from './projections-table'
import { VisualizationCharts } from './visualization-charts'
import { MonthlyStats } from './monthly-stats'
import { calculateProjections } from './calculations'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, Building, Home, Menu, Settings, User } from 'lucide-react'
import { InvestmentSummary } from './investment-summary'
import TopBar from './topBar'

export type InputValues = {
  propertyPrice: number
  equityInvestment: number
  loanAmount: number
  interestRate: number
  mortgageTerm: number
  monthlyRentalIncome: number
  annualRentIncrease: number
  monthlyExpenses: number
  annualExpenseIncrease: number
  annualPropertyAppreciation: number
}

const defaultInputs: InputValues = {
  propertyPrice: 2000000,
  equityInvestment: 1000000,
  loanAmount: 1000000,
  interestRate: 4,
  mortgageTerm: 20,
  monthlyRentalIncome: 15000,
  annualRentIncrease: 2,
  monthlyExpenses: 3000,
  annualExpenseIncrease: 1,
  annualPropertyAppreciation: 3
}

export default function Dashboard() {
  const [inputs, setInputs] = useState<InputValues>(defaultInputs)

  const projections = calculateProjections(inputs)

  const handleInputChange = (newInputs: Partial<InputValues>) => {
    setInputs(prev => ({ ...prev, ...newInputs }))
  }


  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="flex-1">
        <div className="container mx-auto p-4">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Investment Parameters</CardTitle>
                <CardDescription>Adjust the inputs to simulate different scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <InputSection inputs={inputs} onInputChange={handleInputChange} />
              </CardContent>
            </Card>
            <InvestmentSummary projections={projections} inputs={inputs} />
          </div>
          <Tabs defaultValue="table" className="mt-6">
            <TabsList>
              <TabsTrigger value="table">Projections Table</TabsTrigger>
              <TabsTrigger value="charts">Visualization Charts</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Statistics</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <ProjectionsTable projections={projections} />
            </TabsContent>
            <TabsContent value="charts">
              <VisualizationCharts projections={projections} />
            </TabsContent>
            <TabsContent value="monthly">
              <MonthlyStats inputs={inputs} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}