import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface expensesTableProps {
  expenses: Array<{ numDocumento: string, tipoDespesa: string, numero: number, nomeFornecedor: string, cnpjCpfFornecedor: string, dataDocumento: string, valorDocumento: string }>,
  isLoading: boolean,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  lastPage: number,
  title: string
}

export function ExpensesTable({ expenses, isLoading, title, currentPage, setCurrentPage, lastPage }: expensesTableProps) {
  if (isLoading) return (
    <Skeleton className="md:max-w-1/2 w-full min-h-[300px]"></Skeleton>
  )

  return (
    <div className="border rounded-xl py-2 md:w-1/2 w-full">
      <p className="text-center font-bold">{ title }</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Data</TableHead>
            <TableHead>Tipo de Despesa / Fornecedor</TableHead>
            <TableHead>Valor Gasto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses && expenses.map((item) => {
            return (
              <TableRow key={item.numDocumento} className="text-left px-4">
                <TableCell className="text-left w-[60px]">{new Date(item.dataDocumento).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-[120px]">
                  <p style={{ whiteSpace: 'normal' }}>
                    {item.tipoDespesa}<br /><em>{item.nomeFornecedor} - {item.cnpjCpfFornecedor}</em>
                  </p>
                </TableCell>
              <TableCell className="max-w-[60px]">
                {Number(item.valorDocumento).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
              </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="flex gap-1 mt-2">
        <Button variant="ghost" className="hover:cursor-pointer" disabled={currentPage === 1 || isLoading} onClick={() => setCurrentPage(currentPage - 1)}>
          Anterior
        </Button>
        <Input type="number" value={currentPage} onChange={(event) => setCurrentPage(Number(event.target.value))} disabled className="w-16 text-center"></Input>
        <Button variant="ghost" className="hover:cursor-pointer" onClick={() => setCurrentPage(currentPage + 1)} disabled={isLoading || currentPage === lastPage}>
          Próximo
        </Button>
      </div>
    </div>
  )
}
