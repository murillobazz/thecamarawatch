import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface propositionsTableProps {
  propositions: Array<{ id: string, siglaTipo: string, numero: number, ementa: string, ano: number }>,
  isLoading: boolean
}

export function PropositionsTable({ propositions, isLoading }: propositionsTableProps) {
  if (isLoading) return (
    <Skeleton className="w-full min-h-[300px]"></Skeleton>
  )
  // TODO -> Adicionar paginação
  return (
    <div className="border rounded-xl py-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Ementa</TableHead>
            <TableHead className="text-right">Ano</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propositions && propositions.map((item) => {
            return (
              <TableRow key={item.id} className="text-left px-4">
                <TableCell>{item.siglaTipo}</TableCell>
                <TableCell>{item.numero}</TableCell>
                <TableCell className="w-3xl text-left"><p style={{ whiteSpace: 'normal' }}>{(item.ementa)}</p></TableCell>
                <TableCell className="text-right">{item.ano === 0 ? "2025" : item.ano}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
