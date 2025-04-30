import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileCard from '@/components/profileCard';
import TotalExpensesCard from '@/components/totalExpensesCard';
import DeputyProps from '@/types/deputyProps';
import { PropositionsTable } from './components/propositions-table';

function Deps() {
  const [deputies, setDeputies] = useState<DeputyProps[]>([]);
  const [filteredDeputies, setFilteredDeputies] = useState<DeputyProps[]>([]);
  const [selectedDeputy, setSelectedDeputy] = useState<DeputyProps | null>(null);
  const [deputyPropositions, setDeputyPropositions] = useState([]);
  // TODO -> Implementar loading
  // const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deputyId, setDeputyId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (deputy: DeputyProps) => {
    setOpen(false);
    // setIsLoading(true);
    setDeputyId(deputy.id);
  }

  useEffect(() => {
    const fetchDeputies = async () => {
      try {
        // console.log("fetchDeputies");
        // const response = await fetch(`http://localhost:8010/proxy/deputados?ordem=ASC&ordenarPor=nome`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome`);
        const json = await response.json();
        setDeputies(json.dados);
      } catch (e) {
        console.log(e);
      }
    }

    fetchDeputies();
  }, [])

  useEffect(() => {
    const fetchDeputy = async (id: number) => {
      try {
        // const response = await fetch(`http://localhost:8010/proxy/deputados/${id}`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`);
        const json = await response.json();
        setSelectedDeputy(json.dados);
      } catch (e) {
        console.log(e);
      }

      // setIsLoading(false);
    }

    if (deputyId) {
      fetchDeputy(deputyId);
    }
  }, [deputyId])

  useEffect(() => {
    const filteredDeputies = deputies
      .filter((deputy: DeputyProps) =>
        deputy.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 20);
    if (searchTerm) setFilteredDeputies(filteredDeputies);
  }, [searchTerm, deputies])

  useEffect(() => {
    const fetchDeputyPropositions = async (deputy: DeputyProps) => {
      try {
        const dataFim = new Date().toISOString().split('T', 1)[0];
        // const response = await fetch(`http://localhost:8010/proxy/deputados/${id}`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?ordem=DESC&siglaTipo=PL&idDeputadoAutor=${deputy.id}&dataApresentacaoInicio=${deputy.ultimoStatus.data}&dataApresentacaoFim=${dataFim}&itens=100`);
        const json = await response.json();
        setDeputyPropositions(json.dados)
      } catch (e) {
        console.log(e);
      }
    }

    if (selectedDeputy) {
      fetchDeputyPropositions(selectedDeputy);
    }
  }, [selectedDeputy])

  return (
    <>
      {/* <h1 className="mb-4">Deputados</h1> */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="hover:cursor-pointer mb-2"><Search /> Buscar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="mb-2">Deputados em exercício</DialogTitle>
            <Input placeholder="Digite um nome" className="w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></Input>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription> */}
            <ScrollArea type="always" className="max-h-72 w-full rounded-md border">
              {filteredDeputies && filteredDeputies.map((deputy: DeputyProps) => {
                return (
                  <div key={deputy.id} className="hover:cursor-pointer hover:bg-accent pt-2">
                    <Button variant="link" onClick={() => handleClick(deputy)} className="text-sm text-center pb-2">
                      {deputy.nome}
                    </Button>
                    <Separator />
                  </div>
                )
              })}
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col items-start justify-center gap-4 py-4 md:gap-6 md:py-6 max-h-[360px]">
        <ProfileCard selectedDeputy={selectedDeputy} />
        <TotalExpensesCard selectedDeputy={selectedDeputy} />
        {/* <ExpensesCard selectedDeputy={selectedDeputy} /> */}
      </div>
      {selectedDeputy && <PropositionsTable propositions={deputyPropositions} isLoading={false}></PropositionsTable>}
    </>
  )
}

export default Deps;