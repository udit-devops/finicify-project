import { TrendingUp, DollarSign, PieChart, AlertCircle } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 5000 },
  { month: "Apr", value: 4500 },
  { month: "May", value: 6000 },
  { month: "Jun", value: 5500 },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your investments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Portfolio Value"
          value="$142,350"
          icon={DollarSign}
          trend="up"
          trendValue="12.5%"
          variant="success"
        />
        <StatsCard
          title="Monthly Return"
          value="8.2%"
          icon={TrendingUp}
          trend="up"
          trendValue="2.1%"
          variant="info"
        />
        <StatsCard
          title="Active Investments"
          value="24"
          icon={PieChart}
          variant="default"
        />
        <StatsCard
          title="Risk Score"
          value="Medium"
          icon={AlertCircle}
          variant="warning"
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Portfolio Performance</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">1M</Button>
            <Button variant="outline" size="sm">3M</Button>
            <Button variant="default" size="sm">6M</Button>
            <Button variant="outline" size="sm">1Y</Button>
            <Button variant="outline" size="sm">ALL</Button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              View Sector Risk Analysis
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Compare Company Performance
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Generate Risk Report
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Portfolio Analysis Updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
