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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Building className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                Real Estate Simulator
              </span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/"
              >
                Home
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/reports"
              >
                Reports
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/help"
              >
                Help
              </a>
            </nav>
          </div>
          <Button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 md:hidden"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:R1mcq:"
            data-state="closed"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          {/* <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="w-9 px-0"
              >
                <BarChart3 className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-9 px-0"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-9 px-0"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User</span>
              </Button>
            </nav>
          </div> */}
        </div>
      </header>
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