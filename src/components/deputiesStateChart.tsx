"use client"

import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  states: {
    label: "Número de deputados no estado:\x20"
  },
  AC: {
    label: "AC",
    color: "hsl(var(--chart-1))",
  },
  AL: {
    label: "AL",
    color: "hsl(var(--chart-2))",
  },
  AP: {
    label: "AP",
    color: "hsl(var(--chart-3))",
  },
  AM: {
    label: "AM",
    color: "hsl(var(--chart-4))",
  },
  BA: {
    label: "BA",
    color: "hsl(var(--chart-5))",
  },
  CE: {
    label: "CE",
    color: "hsl(var(--chart-5))",
  },
  DF: {
    label: "DF",
    color: "hsl(var(--chart-5))",
  },
  ES: {
    label: "ES",
    color: "hsl(var(--chart-5))",
  },
  GO: {
    label: "GO",
    color: "hsl(var(--chart-5))",
  },
  MA: {
    label: "MA",
    color: "hsl(var(--chart-5))",
  },
  MT: {
    label: "MT",
    color: "hsl(var(--chart-5))",
  },
  MS: {
    label: "MS",
    color: "hsl(var(--chart-5))",
  },
  MG: {
    label: "MG",
    color: "hsl(var(--chart-5))",
  },
  PA: {
    label: "PA",
    color: "hsl(var(--chart-5))",
  },
  PB: {
    label: "PB",
    color: "hsl(var(--chart-5))",
  },
  PR: {
    label: "PR",
    color: "hsl(var(--chart-5))",
  },
  PE: {
    label: "PE",
    color: "hsl(var(--chart-5))",
  },
  PI: {
    label: "PI",
    color: "hsl(var(--chart-5))",
  },
  RJ: {
    label: "RJ",
    color: "hsl(var(--chart-5))",
  },
  RN: {
    label: "RN",
    color: "hsl(var(--chart-5))",
  },
  RS: {
    label: "RS",
    color: "hsl(var(--chart-5))",
  },
  RO: {
    label: "RO",
    color: "hsl(var(--chart-5))",
  },
  RR: {
    label: "RR",
    color: "hsl(var(--chart-5))",
  },
  SC: {
    label: "SC",
    color: "hsl(var(--chart-5))",
  },
  SP: {
    label: "SP",
    color: "hsl(var(--chart-5))",
  },
  SE: {
    label: "SE",
    color: "hsl(var(--chart-5))",
  },
  TO: {
    label: "TO",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function DeputiesStateChart({ chartData }: { chartData: object[] }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto h-[400px] aspect-square max-h-full max-w-full [&_.recharts-text]:fill-background"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="states" />}
        />
        <Pie data={chartData} dataKey="value">
          <LabelList
            dataKey="name"
            className="fill-gray-900 font-bold"
            stroke="none"
            fontSize={10}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
