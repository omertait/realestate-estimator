import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { allMonthlyStats, calculateMonthlyStats, YearlyProjection } from './calculations'
import { InputValues } from './dashboard'

type InvestmentSummaryProps = {
  projections: YearlyProjection[]
  inputs: InputValues
}

export function InvestmentSummary({ projections, inputs }: InvestmentSummaryProps) {
  // Calculate cumulative cash flow for break-even analysis
  let cumulativeCashFlow = 0;
  const breakEvenYear = projections.findIndex(p => {
    cumulativeCashFlow += p.cashFlow;
    return cumulativeCashFlow >= inputs.equityInvestment; // Break-even when cumulative cash flow covers initial equity
  }) + 1;
  const isBreakEven = breakEvenYear > 0 && breakEvenYear <= inputs.mortgageTerm;

  // Calculate overall profitability using total cash flow
  const totalCashFlow = projections.reduce((sum, p) => sum + p.cashFlow, 0);
  const isProfitable = totalCashFlow > 0;

  const yearsMonthlyStats = allMonthlyStats(inputs);
  const monthlyCashFlowMin = Math.min(...yearsMonthlyStats.map((monthlyStats) => monthlyStats.monthlyProfit))
  const monthlyCashFlowMax = Math.max(...yearsMonthlyStats.map((monthlyStats) => monthlyStats.monthlyProfit))
  
  // Calculate cumulative ROI over time
  const cumulativeROI = projections.map((p, index) => {
    const cumulativeCashFlow = projections.slice(0, index + 1).reduce((sum, p) => sum + p.cashFlow, 0);
    const cumulativeEquityGrowth = p.equity - inputs.equityInvestment;
    return ((cumulativeCashFlow + cumulativeEquityGrowth) / inputs.equityInvestment) * 100;
  });

  // Calculate yield (Cap Rate) using the last year's data
  const lastYear = projections[projections.length - 1];
  const capRate = (lastYear.noi / lastYear.propertyValue) * 100;

  // Calculate cash-on-cash return for the first year
  const firstYearCoCReturn = (projections[0].cashFlow / inputs.equityInvestment) * 100;

  // Calculate total ROI at the final year for overall performance
  const totalROI = cumulativeROI[cumulativeROI.length - 1];


  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Summary</CardTitle>
        <CardDescription>Key insights about your investment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Break-even Point</h3>
            <p>
              {isBreakEven
                ? <>You should break even in <span className="text-accent font-bold">year {breakEvenYear}</span>.</>
                : "You won't break even within the mortgage term."}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Profitability</h3>
            <p>
              {isProfitable
                ? <>This deal is profitable, with a total cash flow of <span className="text-accent font-bold">₪{totalCashFlow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> over {inputs.mortgageTerm} years.<br/>
                    The monthly cash flow ranges from <span className="text-accent font-bold">₪{monthlyCashFlowMin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> to <span className="text-accent font-bold">₪{monthlyCashFlowMax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>.</>
                : "This deal is not profitable based on the current projections."}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Yield (Cap Rate)</h3>
            <p>The capitalization rate for this investment is <span className="text-accent font-bold">{capRate.toFixed(2)}%</span>.</p>
          </div>
          <div>
            <h3 className="font-semibold">First Year Cash-on-Cash Return</h3>
            <p>The cash-on-cash return for the first year is <span className="text-accent font-bold">{firstYearCoCReturn.toFixed(2)}%</span>.</p>
          </div>
          <div>
            <h3 className="font-semibold">Total ROI</h3>
            <p>The total return on investment over {inputs.mortgageTerm} years is <span className="text-accent font-bold">{totalROI.toFixed(2)}%</span>.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
