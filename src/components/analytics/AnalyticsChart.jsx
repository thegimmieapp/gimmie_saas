import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Button } from "@/components/ui/button";

const sampleData = {
  revenue: [
    { name: '1', value: 4000 }, { name: '5', value: 3000 }, { name: '10', value: 2000 },
    { name: '15', value: 2780 }, { name: '20', value: 1890 }, { name: '25', value: 2390 },
    { name: '30', value: 3490 },
  ],
  clicks: [
    { name: '1', value: 2400 }, { name: '5', value: 1398 }, { name: '10', value: 9800 },
    { name: '15', value: 3908 }, { name: '20', value: 4800 }, { name: '25', value: 3800 },
    { name: '30', value: 4300 },
  ],
  conversions: [
    { name: '1', value: 24 }, { name: '5', value: 13 }, { name: '10', value: 45 },
    { name: '15', value: 39 }, { name: '20', value: 48 }, { name: '25', value: 38 },
    { name: '30', value: 43 },
  ]
};

const chartConfig = {
  revenue: { color: "#10b981", name: "Revenue ($)" },
  clicks: { color: "#3b82f6", name: "Clicks" },
  conversions: { color: "#8b5cf6", name: "Conversions" },
};

export default function AnalyticsChart() {
  const [activeMetric, setActiveMetric] = useState("revenue");
  const data = sampleData[activeMetric];
  const config = chartConfig[activeMetric];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <CardTitle>Performance Over Time</CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            Displaying: <span className="font-semibold" style={{ color: config.color }}>{config.name}</span>
          </p>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg mt-3 sm:mt-0">
          {Object.keys(chartConfig).map(metric => (
            <Button
              key={metric}
              size="sm"
              variant={activeMetric === metric ? "default" : "ghost"}
              onClick={() => setActiveMetric(metric)}
              className={`capitalize text-xs px-3 ${
                activeMetric === metric
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              {metric}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={config.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickFormatter={(value) => `Day ${value}`} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelFormatter={(label) => `Day ${label}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                name={config.name}
                stroke={config.color}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#chartGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}