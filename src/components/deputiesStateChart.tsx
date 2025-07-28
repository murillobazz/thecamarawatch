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
    label: "Acre",
    color: "hsl(var(--chart-1))",
  },
  AL: {
    label: "Alagoas",
    color: "hsl(var(--chart-2))",
  },
  AP: {
    label: "Amapá",
    color: "hsl(var(--chart-3))",
  },
  AM: {
    label: "Amazonas",
    color: "hsl(var(--chart-4))",
  },
  BA: {
    label: "Bahia",
    color: "hsl(var(--chart-5))",
  },
  CE: {
    label: "Ceará",
    color: "hsl(var(--chart-5))",
  },
  DF: {
    label: "Distrito Federal",
    color: "hsl(var(--chart-5))",
  },
  ES: {
    label: "Espírito Santo",
    color: "hsl(var(--chart-5))",
  },
  GO: {
    label: "Goiás",
    color: "hsl(var(--chart-5))",
  },
  MA: {
    label: "Maranhão",
    color: "hsl(var(--chart-5))",
  },
  MT: {
    label: "Mato Grosso",
    color: "hsl(var(--chart-5))",
  },
  MS: {
    label: "Mato Grosso do Sul",
    color: "hsl(var(--chart-5))",
  },
  MG: {
    label: "Minas Gerais",
    color: "hsl(var(--chart-5))",
  },
  PA: {
    label: "Pará",
    color: "hsl(var(--chart-5))",
  },
  PB: {
    label: "Paraíba",
    color: "hsl(var(--chart-5))",
  },
  PR: {
    label: "Paraná",
    color: "hsl(var(--chart-5))",
  },
  PE: {
    label: "Pernambuco",
    color: "hsl(var(--chart-5))",
  },
  PI: {
    label: "Piauí",
    color: "hsl(var(--chart-5))",
  },
  RJ: {
    label: "Rio de Janeiro",
    color: "hsl(var(--chart-5))",
  },
  RN: {
    label: "Rio Grande do Norte",
    color: "hsl(var(--chart-5))",
  },
  RS: {
    label: "Rio Grande do Sul",
    color: "hsl(var(--chart-5))",
  },
  RO: {
    label: "Rondônia",
    color: "hsl(var(--chart-5))",
  },
  RR: {
    label: "Roraima",
    color: "hsl(var(--chart-5))",
  },
  SC: {
    label: "Santa Catarina",
    color: "hsl(var(--chart-5))",
  },
  SP: {
    label: "São Paulo",
    color: "hsl(var(--chart-5))",
  },
  SE: {
    label: "Sergipe",
    color: "hsl(var(--chart-5))",
  },
  TO: {
    label: "Tocantins",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function DeputiesStateChart({ chartData }: { chartData: object[] }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto h-[640px] aspect-square max-h-full max-w-full [&_.recharts-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="name" />}
        />
        <Pie data={chartData} dataKey="value">
          <LabelList
            dataKey="name"
            stroke="none"
            fontSize={12}
            position="outside"
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
