'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { YearlyProjection } from './calculations'

type ProjectionsTableProps = {
  projections: YearlyProjection[]
}

export function ProjectionsTable({ projections }: ProjectionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Year</TableHead>
          <TableHead>Rental Income</TableHead>
          <TableHead>Expenses</TableHead>
          <TableHead>NOI</TableHead>
          <TableHead>Loan Balance</TableHead>
          <TableHead>Cash Flow</TableHead>
          <TableHead>Property Value</TableHead>
          <TableHead>Equity</TableHead>
          <TableHead>ROI</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projections.map((projection) => (
          <TableRow key={projection.year}>
            <TableCell>{projection.year}</TableCell>
            <TableCell>₪{projection.rentalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell>₪{projection.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell>₪{projection.noi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell>₪{projection.loanBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell>₪{projection.cashFlow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell>₪{projection.propertyValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell>₪{projection.equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell>{projection.roi.toFixed(2)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}