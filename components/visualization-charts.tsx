import { Bar, Line, LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { YearlyProjection } from './calculations'

type VisualizationChartsProps = {
  projections: YearlyProjection[]
}

export function VisualizationCharts({ projections }: VisualizationChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="max-h-max">
        <CardHeader>
          <CardTitle>Cash Flow Analysis</CardTitle>
          <CardDescription>Cash inflows, outflows, and cumulative cash flow over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              rentalIncome: {
                label: "Rental Income",
                color: "hsl(var(--chart-1))",
              },
              expenses: {
                label: "Expenses",
                color: "hsl(var(--chart-2))",
              },
              loanPayment: {
                label: "Loan Payment",
                color: "hsl(var(--chart-3))",
              },
              cumulativeCashFlow: {
                label: "Cumulative Cash Flow",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="min-w-[300px]"
          >
            <ResponsiveContainer>
              <ComposedChart data={projections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="rentalIncome" stackId="a" fill="var(--color-rentalIncome)" name="Rental Income" />
                <Bar yAxisId="left" dataKey="expenses" stackId="a" fill="var(--color-expenses)" name="Expenses" />
                <Bar yAxisId="left" dataKey="loanPayment" stackId="a" fill="var(--color-loanPayment)" name="Loan Payment" />
                <Line yAxisId="right" type="monotone" dataKey="cashFlow" stroke="var(--color-cumulativeCashFlow)" name="Cumulative Cash Flow" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="max-h-max">
        <CardHeader>
          <CardTitle>Property Value and Loan Balance</CardTitle>
          <CardDescription>Property value growth and loan balance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              propertyValue: {
                label: "Property Value",
                color: "hsl(var(--chart-2))",
              },
              loanBalance: {
                label: "Loan Balance",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="min-w-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="propertyValue" stroke="var(--color-propertyValue)" strokeWidth={2} name="Property Value" />
                <Line type="monotone" dataKey="loanBalance" stroke="var(--color-loanBalance)" strokeWidth={2} name="Loan Balance" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="max-h-max">
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Monthly expense categories over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              maintenance: {
                label: "Maintenance",
                color: "hsl(var(--chart-1))",
              },
              propertyTax: {
                label: "Property Tax",
                color: "hsl(var(--chart-2))",
              },
              insurance: {
                label: "Insurance",
                color: "hsl(var(--chart-3))",
              },
              otherExpenses: {
                label: "Other Expenses",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="min-w-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="maintenance" stackId="a" fill="var(--color-maintenance)" name="Maintenance" />
                <Bar dataKey="propertyTax" stackId="a" fill="var(--color-propertyTax)" name="Property Tax" />
                <Bar dataKey="insurance" stackId="a" fill="var(--color-insurance)" name="Insurance" />
                <Bar dataKey="otherExpenses" stackId="a" fill="var(--color-otherExpenses)" name="Other Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="max-h-max">
        <CardHeader>
          <CardTitle>Net Worth Over Time</CardTitle>
          <CardDescription>Changes in net worth integrating property value growth and loan payoff</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              netWorth: {
                label: "Net Worth",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="min-w-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="netWorth" stroke="var(--color-netWorth)" fill="var(--color-netWorth)" fillOpacity={0.6} name="Net Worth" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}