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

interface propositionsTableProps {
  propositions: Array<{ id: string, siglaTipo: string, numero: number, ementa: string, ano: number }>,
  isLoading: boolean,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  lastPage: number,
  title: string
}

export function PropositionsTable({ propositions, isLoading, title, currentPage, setCurrentPage, lastPage }: propositionsTableProps) {

  if (isLoading) return (
    <Skeleton className="md:w-1/2 w-full min-h-[300px]"></Skeleton>
  )

  return (
    <div className="border rounded-xl py-2 md:w-1/2 w-full">
      <p className="text-center font-bold">{ title }</p>
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
                <TableCell className="w-full text-left">
                  <p style={{ whiteSpace: 'normal' }}>
                    <span className={item.ementa ? "" : "italic"}>
                      {(item.ementa ? item.ementa : "Informação de Ementa não registrada")}
                    </span>
                  </p>
                </TableCell>
                <TableCell className="text-right">{item.ano === 0 ? "2025" : item.ano}</TableCell>
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
