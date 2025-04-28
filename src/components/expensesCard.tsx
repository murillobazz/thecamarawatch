import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ExpensesCard({ selectedDeputy }) {
  if (selectedDeputy) {
    return (
      <Card className="p-4 w-full max-w-[420px]">
        <PieChart width={350} height={400}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      </Card>
    )
  }

  return (
    <div>
      <p className="text-gray-500 text-sm">Selecione um deputado para visualizar seus dados</p>
    </div>
  )
}