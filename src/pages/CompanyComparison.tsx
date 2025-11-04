import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Performance data for the chart
const performanceData6Months = [
  { name: "Technology Fund", value: 14.64 },
  { name: "Global Equity", value: 14.84 },
  { name: "AI Fund", value: 13.25 },
  { name: "Portfolio Fund", value: 12.88 },
  { name: "Sustainability Fund", value: 11.92 },
];

const comparisonData = [
  {
    company: "Yapı Kredi Portfolio Management A.Ş.",
    fundCount: 12,
    totalSize: "34.55B",
    avgReturn: 23.53,
    avgFee: 23.24,
    avgVolatility: 25.14,
  },
  {
    company: "Yapı Kredi Portfolio Management A.Ş.",
    fundCount: 15,
    totalSize: "42.33B",
    avgReturn: 24.15,
    avgFee: 22.88,
    avgVolatility: 24.56,
  },
  {
    company: "Yapı Kredi Portfolio Management A.Ş.",
    fundCount: 10,
    totalSize: "28.92B",
    avgReturn: 22.91,
    avgFee: 23.67,
    avgVolatility: 25.89,
  },
];

const timePeriods = ["1 week", "1 month", "6 months", "2025", "1 Year", "5 Years"];

export default function CompanyComparison() {
  const [comparisonMode, setComparisonMode] = useState<"sector" | "internal">("internal");
  const [selectedPeriod, setSelectedPeriod] = useState("6 months");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Company Internal Comparison</h1>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-3">
        <Button
          variant={comparisonMode === "sector" ? "default" : "outline"}
          onClick={() => setComparisonMode("sector")}
          className={cn(
            "rounded-lg px-6 py-2",
            comparisonMode === "sector" && "bg-primary text-primary-foreground"
          )}
        >
          Compare with Sector
        </Button>
        <Button
          variant={comparisonMode === "internal" ? "default" : "outline"}
          onClick={() => setComparisonMode("internal")}
          className={cn(
            "rounded-lg px-6 py-2",
            comparisonMode === "internal" && "bg-primary text-primary-foreground"
          )}
        >
          Compare Within Company
        </Button>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground">
        Company Selection: Analyze the funds of a specific portfolio management company in detail.
      </p>

      {/* Company Selection */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Company to be Analyzed</h2>
        <Select defaultValue="inveo">
          <SelectTrigger className="w-full max-w-md h-12">
            <SelectValue placeholder="Portfolio Management Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inveo">INVEO PORTFÖY YÖNETİM A.Ş.</SelectItem>
            <SelectItem value="yapi-kredi">Yapı Kredi Portfolio Management A.Ş.</SelectItem>
            <SelectItem value="deniz">Deniz Portfolio Management A.Ş.</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Company Analysis Stats */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Company Analysis</h2>
          <Button variant="outline" size="sm">
            Compare with Sector
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Fund Count"
            value="75"
            variant="default"
          />
          <StatsCard
            title="Total Assets Under Management"
            value="75.7B TL"
            variant="default"
          />
          <StatsCard
            title="Average Management Fee"
            value="2.03%"
            variant="default"
          />
          <StatsCard
            title="Average 1 Year Return"
            value="23.61%"
            variant="default"
          />
        </div>
      </Card>

      {/* Company-Based Comparison Table */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Company-Based Comparison</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Company</TableHead>
                <TableHead className="text-right text-muted-foreground">Fund Count</TableHead>
                <TableHead className="text-right text-muted-foreground">Total Size (TL)</TableHead>
                <TableHead className="text-right text-muted-foreground">Average 1 Year Return (%)</TableHead>
                <TableHead className="text-right text-muted-foreground">Average Fee (%)</TableHead>
                <TableHead className="text-right text-muted-foreground">Average Volatility (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index} className="hover:bg-secondary/50">
                  <TableCell className="font-medium">{row.company}</TableCell>
                  <TableCell className="text-right">{row.fundCount}</TableCell>
                  <TableCell className="text-right">{row.totalSize}</TableCell>
                  <TableCell className="text-right">{row.avgReturn}</TableCell>
                  <TableCell className="text-right">{row.avgFee}</TableCell>
                  <TableCell className="text-right">{row.avgVolatility}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Performance Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Company Internal Performance Chart - Top 5 Funds</h2>
        </div>
        
        {/* Time Period Selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {timePeriods.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={cn(
                "rounded-lg",
                selectedPeriod === period && "bg-primary text-primary-foreground"
              )}
            >
              {period}
            </Button>
          ))}
        </div>

        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={performanceData6Months}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              width={110}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
              formatter={(value: number) => [`${value}%`, "Return"]}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--chart-1))"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
