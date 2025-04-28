import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";


export function PropositionsTable({ propositions, isLoading }) {
  if (isLoading) return (
    <Skeleton className="w-full min-h-[300px]"></Skeleton>
  )

  return (
    <Table>
      <TableCaption>Proposições recentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Número</TableHead>
          <TableHead className="w-[100px]">Ementa</TableHead>
          <TableHead className="text-right">Ano</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {propositions && propositions.map((item) => {
          return (
            <TableRow key={item.id} className="text-left">
              <TableCell>{item.siglaTipo}</TableCell>
              <TableCell>{item.numero}</TableCell>
              <TableCell className="text-left"><span>{(item.ementa).slice(0, 80)}...</span></TableCell>
              <TableCell className="text-right">{item.ano === 0 ? "2025" : item.ano}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
