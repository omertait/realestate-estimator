'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InputValues } from './dashboard'
import { allMonthlyStats } from './calculations'

type MonthlyStatsProps = {
  inputs: InputValues
}

export function MonthlyStats({ inputs }: MonthlyStatsProps) {
  const yearsMonthlyStats = allMonthlyStats(inputs)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Statistics</CardTitle>
        <CardDescription>Detailed monthly breakdown of your investment</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableHead>Rental Income</TableHead>
              <TableHead>Expenses</TableHead>
              <TableHead>Mortgage Payment</TableHead>
              <TableHead>Monthly Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                {yearsMonthlyStats.map((monthlyStats, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>₪{monthlyStats.rentalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell>₪{monthlyStats.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell>₪{monthlyStats.mortgagePayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell>₪{monthlyStats.monthlyProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}