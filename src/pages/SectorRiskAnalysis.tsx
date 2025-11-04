import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search, ArrowUpDown } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Data matching the exact format from requirements
const riskData = [
  { name: "Very High", value: 49.3, color: "#EF4444", label: "Çok Yüksek" },
  { name: "High", value: 12.53, color: "#F59E0B", label: "Yüksek" },
  { name: "Medium", value: 14, color: "#3B82F6", label: "Orta" },
  { name: "Low", value: 8, color: "#84CC16", label: "Düşük" },
  { name: "Very Low", value: 3, color: "#10B981", label: "En Düşük" },
];

const topFundsData = [
  {
    name: "Atlas Portfolio Management Fund",
    company: "Deniz Portfolio Management Inc.",
    category: "Bond Funds",
    oneYear: 10.53,
    threeYear: 23.35,
    risk: "Low",
  },
  {
    name: "Yapı Kredi Portfolio Management Fund",
    company: "Yapı Kredi Portfolio",
    category: "Equity Funds",
    oneYear: 12.66,
    threeYear: 25.22,
    risk: "High",
  },
  {
    name: "HSBC Portfolio Management Fund",
    company: "HSBC Portfolio Management Inc.",
    category: "Mixed Funds",
    oneYear: 11.25,
    threeYear: 24.15,
    risk: "Medium",
  },
  {
    name: "Akbank Portfolio Management Fund",
    company: "Akbank Portfolio Management",
    category: "Bond Funds",
    oneYear: 9.88,
    threeYear: 22.45,
    risk: "Very Low",
  },
  {
    name: "Garanti Portfolio Management Fund",
    company: "Garanti Portfolio Management",
    category: "Equity Funds",
    oneYear: 13.42,
    threeYear: 26.88,
    risk: "Medium",
  },
];

type SortField = "name" | "company" | "category" | "oneYear" | "threeYear" | "risk";
type SortDirection = "asc" | "desc" | null;

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Very Low":
      return "bg-green-500/20 text-green-500 border-green-500/30";
    case "Low":
      return "bg-teal-500/20 text-teal-500 border-teal-500/30";
    case "Medium":
      return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    case "High":
      return "bg-orange-500/20 text-orange-500 border-orange-500/30";
    case "Very High":
      return "bg-red-500/20 text-red-500 border-red-500/30";
    default:
      return "bg-muted/20 text-muted-foreground";
  }
};

export default function SectorRiskAnalysis() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Filter and sort funds
  const filteredAndSortedFunds = useMemo(() => {
    let filtered = topFundsData.filter(
      (fund) =>
        fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortField && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }
        
        const comparison = String(aValue).localeCompare(String(bValue));
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sector Risk Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Analyze risk distribution across sectors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Risk Distribution Chart Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Sector Funds Risk Analysis</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Donut Chart */}
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {riskData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={activeIndex === index ? 1 : activeIndex === null ? 1 : 0.5}
                      stroke={activeIndex === index ? entry.color : "none"}
                      strokeWidth={activeIndex === index ? 2 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Level Percentage Boxes */}
          <div className="flex flex-col gap-3 justify-center">
            {riskData.map((item, index) => (
              <div
                key={item.name}
                className={cn(
                  "p-4 rounded-lg border transition-all",
                  activeIndex === index && "scale-105 shadow-lg",
                  item.name === "Very Low" && "bg-gradient-to-r from-green-500/20 to-green-500/5 border-green-500/30",
                  item.name === "Low" && "bg-gradient-to-r from-teal-500/20 to-teal-500/5 border-teal-500/30",
                  item.name === "Medium" && "bg-gradient-to-r from-blue-500/20 to-blue-500/5 border-blue-500/30",
                  item.name === "High" && "bg-gradient-to-r from-orange-500/20 to-orange-500/5 border-orange-500/30",
                  item.name === "Very High" && "bg-gradient-to-r from-red-500/20 to-red-500/5 border-red-500/30"
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-xl font-bold">%{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Top Performing Funds Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Top Performing Funds in the Sector
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search fund name, company, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sortable Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-2 hover:text-foreground"
                  >
                    Fund Name
                    {sortField === "name" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("company")}
                    className="flex items-center gap-2 hover:text-foreground"
                  >
                    Company
                    {sortField === "company" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("category")}
                    className="flex items-center gap-2 hover:text-foreground"
                  >
                    Category
                    {sortField === "category" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </button>
                </TableHead>
                <TableHead className="text-right">
                  <button
                    onClick={() => handleSort("oneYear")}
                    className="flex items-center gap-2 hover:text-foreground ml-auto"
                  >
                    1Y Return (%)
                    {sortField === "oneYear" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </button>
                </TableHead>
                <TableHead className="text-right">
                  <button
                    onClick={() => handleSort("threeYear")}
                    className="flex items-center gap-2 hover:text-foreground ml-auto"
                  >
                    3Y Return (%)
                    {sortField === "threeYear" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("risk")}
                    className="flex items-center gap-2 hover:text-foreground"
                  >
                    Risk Level
                    {sortField === "risk" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedFunds.map((fund, index) => (
                <TableRow key={index} className="hover:bg-secondary/50">
                  <TableCell className="font-medium">{fund.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {fund.company}
                  </TableCell>
                  <TableCell>{fund.category}</TableCell>
                  <TableCell className="text-right font-medium text-green-500">
                    {fund.oneYear}%
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-500">
                    {fund.threeYear}%
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium border",
                        getRiskColor(fund.risk)
                      )}
                    >
                      {fund.risk}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
