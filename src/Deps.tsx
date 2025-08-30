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
import { PropositionsTable } from './components/propositionsTable';
import { ExpensesTable } from './components/expensesTable';

function Deps() {
  const [deputies, setDeputies] = useState<DeputyProps[]>([]);
  const [filteredDeputies, setFilteredDeputies] = useState<DeputyProps[]>([]);
  const [selectedDeputy, setSelectedDeputy] = useState<DeputyProps | null>(null);

  const [deputyPropositions, setDeputyPropositions] = useState([]);
  const [currentPropositionsPage, setCurrentPropositionsPage] = useState(1);
  const [lastPropositionsPage, setLastPropositionsPage] = useState(1);

  const [deputyExpenses, setDeputyExpenses] = useState([]);
  const [currentExpensesPage, setCurrentExpensesPage] = useState(1);
  const [lastExpensesPage, setLastExpensesPage] = useState(1);

  // const [isLoading, setIsLoading] = useState(true);
  const [isPropositionsLoading, setIsPropositionsLoading] = useState(true);
  const [isExpensesLoading, setIsExpensesLoading] = useState(true);

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
        // const response = await fetch(`http://localhost:8010/proxy/deputados?ordem=ASC&ordenarPor=nome`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome`);
        const json = await response.json();
        setDeputies(json.dados);
      } catch (e) {
        console.log(e);
      } finally {
        // setIsLoading(false);
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
        setCurrentPropositionsPage(1);
        setCurrentExpensesPage(1);
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
        setIsPropositionsLoading(true);
        // const dataFim = new Date().toISOString().split('T', 1)[0];
        // const dataInicio = new Date(new Date(dataFim).setMonth(new Date(dataFim).getMonth() - 3)).toISOString().split('T', 1)[0];
        const currentYear = new Date().getFullYear();
        // const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?ordem=DESC&siglaTipo=PL&idDeputadoAutor=${deputy.id}&dataApresentacaoInicio=${dataInicio}&dataApresentacaoFim=${dataFim}&itens=10&pagina=${currentPropositionsPage}`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?ordem=DESC&siglaTipo=PL&idDeputadoAutor=${deputy.id}&ano=${currentYear}&itens=10&pagina=${currentPropositionsPage}`);
        const json = await response.json();

        // Seta última página
        const url = json.links.filter((link: { href: string, rel: string }) => link.rel === 'last');
        let newLastPage = url[0].href.split('&').find((item: string) => item.includes('pagina'));
        newLastPage = Number(newLastPage.split('=')[1]);
        setLastPropositionsPage(newLastPage);

        // Verifica se a página tem dados antes de trazer para o state
        if (json.dados.length > 0) {
          setDeputyPropositions(json.dados);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsPropositionsLoading(false);
      }
    }

    if (selectedDeputy) {
      fetchDeputyPropositions(selectedDeputy);
    }
  }, [selectedDeputy, currentPropositionsPage])

  useEffect(() => {
    const fetchDeputyExpenses = async (deputy: DeputyProps) => {
      try {
        setIsExpensesLoading(true);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputy.id}/despesas?itens=10&ordem=DESC&ordenarPor=dataDocumento&pagina=${currentExpensesPage}`);
        const json = await response.json();

        // Seta última página
        const url = json.links.filter((link: { href: string, rel: string }) => link.rel === 'last');
        let newLastPage = url[0].href.split('&').find((item: string) => item.includes('pagina'));
        newLastPage = Number(newLastPage.split('=')[1]);
        setLastExpensesPage(newLastPage);

        // Verifica se a página tem dados antes de trazer para o state
        if (json.dados.length > 0) {
          setDeputyExpenses(json.dados);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsExpensesLoading(false);
      }
    }

    if (selectedDeputy) {
      fetchDeputyExpenses(selectedDeputy);
    }
  }, [selectedDeputy, currentExpensesPage])

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
      <div className="flex md:flex-row flex-col items-start gap-4 py-4 md:gap-2 md:py-2 max-h-[360px]">
        <ProfileCard selectedDeputy={selectedDeputy} />
        <TotalExpensesCard selectedDeputy={selectedDeputy} />
        {/* <ExpensesCard selectedDeputy={selectedDeputy} /> */}
      </div>
      <div className="flex md:flex-row flex-col gap-4 py-4 md:gap-2 md:py-2">
        {selectedDeputy &&
          <PropositionsTable
            title={"Proposições apresentados neste ano"}
            propositions={deputyPropositions}
            isLoading={isPropositionsLoading}
            currentPage={currentPropositionsPage}
            setCurrentPage={setCurrentPropositionsPage}
            lastPage={lastPropositionsPage}
          >
          </PropositionsTable>
        }
        {selectedDeputy &&
          <ExpensesTable
            title={"Despesas do parlamentar"}
            expenses={deputyExpenses}
            isLoading={isExpensesLoading}
            currentPage={currentExpensesPage}
            setCurrentPage={setCurrentExpensesPage}
            lastPage={lastExpensesPage}
          >
          </ExpensesTable>
        }
      </div>

    </>
  )
}

export default Deps;