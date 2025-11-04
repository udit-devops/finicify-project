import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Data matching the exact format from requirements
const heatmapData = [
  { fund: "Atlas Portfolio Management Fund", values: [6.65, 6.42, 6.31, 5.98, 5.88] },
  { fund: "Deniz Portfolio Management Fund", values: [6.22, 6.18, 5.97, 5.61, 5.43] },
  { fund: "Yapı Kredi Portfolio Management Fund", values: [6.55, 6.30, 6.15, 5.82, 5.74] },
  { fund: "HSBC Portfolio Management Fund", values: [6.11, 6.08, 5.87, 5.51, 5.33] },
  { fund: "Akbank Portfolio Management Fund", values: [6.45, 6.20, 6.05, 5.72, 5.64] },
  { fund: "Garanti Portfolio Management Fund", values: [6.75, 6.52, 6.41, 6.08, 5.98] },
  { fund: "İş Bankası Portfolio Management Fund", values: [6.32, 6.28, 6.07, 5.71, 5.53] },
  { fund: "Ziraat Portfolio Management Fund", values: [6.65, 6.40, 6.25, 5.92, 5.84] },
];

const columns = ["1M", "3M", "6M", "1Y", "2Y"];
const scale = [0, 10];

// Color interpolation function
const getColorForValue = (value: number, min: number = 0, max: number = 10) => {
  const normalized = (value - min) / (max - min);
  
  // Interpolate from red (high) to green (low) via yellow
  if (normalized >= 0.75) {
    // Red for high values (75-100%)
    const intensity = (normalized - 0.75) / 0.25;
    return `rgb(${255}, ${Math.floor(255 * (1 - intensity))}, ${Math.floor(255 * (1 - intensity))})`;
  } else if (normalized >= 0.5) {
    // Yellow to Red transition (50-75%)
    const intensity = (normalized - 0.5) / 0.25;
    return `rgb(255, ${Math.floor(255 * (1 - intensity))}, 0)`;
  } else if (normalized >= 0.25) {
    // Green to Yellow transition (25-50%)
    const intensity = (normalized - 0.25) / 0.25;
    return `rgb(${Math.floor(255 * intensity)}, 255, 0)`;
  } else {
    // Green for low values (0-25%)
    const intensity = normalized / 0.25;
    return `rgb(0, ${Math.floor(255 * intensity)}, 0)`;
  }
};

export default function RiskMetrics() {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Investment Fund Comparative Risk Analysis
            </h1>
            <p className="text-muted-foreground mt-1">
              Compare risk metrics across investment funds
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Risk Analysis
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="default">Risk Metrics</Button>
          <Button variant="outline">Correlation Analysis</Button>
          <Button variant="outline">Performance Attribution</Button>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Risk Metrics Comparison</h2>
          </div>

          <div className="flex gap-4">
            {/* Heatmap Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground min-w-[250px] sticky left-0 bg-card z-10">
                      Fund Name
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="text-center p-3 text-sm font-semibold text-muted-foreground min-w-[100px]"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-border/50 hover:bg-secondary/50"
                    >
                      <td className="p-3 text-sm font-medium sticky left-0 bg-card z-10">
                        {row.fund}
                      </td>
                      {row.values.map((value, colIndex) => (
                        <td key={colIndex} className="p-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={cn(
                                  "rounded px-3 py-2 text-center text-sm font-medium transition-all hover:scale-105 cursor-pointer text-white",
                                )}
                                style={{
                                  backgroundColor: getColorForValue(value, scale[0], scale[1]),
                                }}
                              >
                                {value.toFixed(2)}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-1">
                                <p className="font-semibold">{row.fund}</p>
                                <p className="text-xs">
                                  {columns[colIndex]}: <strong>{value.toFixed(2)}</strong>
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Color Scale Bar */}
            <div className="flex flex-col items-center gap-2 py-4">
              <span className="text-xs text-muted-foreground font-medium mb-2">Scale</span>
              <div className="relative h-[400px] w-8 bg-gradient-to-t from-red-500 via-yellow-500 to-green-500 rounded-md">
                {/* Scale Labels */}
                <div className="absolute -left-12 top-0 h-full flex flex-col justify-between items-end pr-2">
                  <span className="text-xs text-muted-foreground font-medium">{scale[1]}</span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {((scale[1] - scale[0]) / 2).toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">{scale[0]}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-xs text-muted-foreground">High</span>
                <span className="text-xs text-muted-foreground">Low</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}
