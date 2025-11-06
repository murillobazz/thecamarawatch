import { useState, useEffect, useMemo } from 'react';
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
  // Estado para lista de deputados
  const [deputies, setDeputies] = useState<DeputyProps[]>([]);
  // Estado para deputado selecionado
  const [selectedDeputy, setSelectedDeputy] = useState<DeputyProps | null>(null);
  // Estado para erro ao buscar deputado
  const [deputyError, setDeputyError] = useState<string | null>(null);
  // Estado para proposições do deputado
  type Proposition = { id: string; siglaTipo: string; numero: number; ementa: string; ano: number; uri: string };
  const [deputyPropositions, setDeputyPropositions] = useState<Proposition[]>([]);
  const [currentPropositionsPage, setCurrentPropositionsPage] = useState(1);
  const [lastPropositionsPage, setLastPropositionsPage] = useState(1);
  // Estado para despesas do deputado
  type Expense = { numDocumento: string; tipoDespesa: string; numero: number; nomeFornecedor: string; cnpjCpfFornecedor: string; dataDocumento: string; valorDocumento: string };
  const [deputyExpenses, setDeputyExpenses] = useState<Expense[]>([]);
  const [currentExpensesPage, setCurrentExpensesPage] = useState(1);
  const [lastExpensesPage, setLastExpensesPage] = useState(1);
  // Estado de carregamento das tabelas
  const [isPropositionsLoading, setIsPropositionsLoading] = useState(false);
  const [isExpensesLoading, setIsExpensesLoading] = useState(false);
  // Estado para busca e debounce
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // Estado para id do deputado selecionado
  const [deputyId, setDeputyId] = useState<number | null>(null);
  // Estado para controle do Dialog
  const [open, setOpen] = useState(false);

  // Função para selecionar deputado ao clicar
  const handleClick = (deputy: DeputyProps) => {
    setOpen(false);
    setDeputyId(deputy.id);
  }

  // Busca lista de deputados ao montar o componente
  useEffect(() => {
    const controller = new AbortController(); // Permite cancelar requisição se desmontar
    const fetchDeputies = async () => {
      try {
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome`, { signal: controller.signal });
        const json = await response.json();
        setDeputies(json.dados);
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return; // Ignora abortos
        console.log(e);
      }
    }
    fetchDeputies();
    return () => controller.abort(); // Cancela requisição se desmontar
  }, [])

  // Busca detalhes do deputado selecionado
  useEffect(() => {
    if (!deputyId) return;
    const controller = new AbortController();
    const fetchDeputy = async (id: number) => {
      try {
        setDeputyError(null); // Limpa erro anterior
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`, { signal: controller.signal });
        if (!response.ok) throw new Error('Erro ao buscar deputado.');
        const json = await response.json();
        setCurrentPropositionsPage(1);
        setCurrentExpensesPage(1);
        setSelectedDeputy(json.dados);
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setSelectedDeputy(null);
        setDeputyError('Não foi possível carregar os dados do deputado. Tente novamente.');
        console.log(e);
      }
    }
    fetchDeputy(deputyId);
    return () => controller.abort();
  }, [deputyId])

  // Debounce da busca para evitar filtro a cada tecla
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Filtra deputados de acordo com busca (memoizado)
  const filteredDeputies = useMemo(() => {
    if (!debouncedSearch) return [];
    const q = debouncedSearch.toLowerCase();
    return deputies.filter(d => d.nome.toLowerCase().includes(q)).slice(0, 20);
  }, [debouncedSearch, deputies]);

  // Busca proposições do deputado selecionado e página atual
  useEffect(() => {
    if (!selectedDeputy) return;
    const controller = new AbortController();
    const fetchDeputyPropositions = async (deputy: DeputyProps) => {
      setIsPropositionsLoading(true);
      try {
        const currentYear = new Date().getFullYear();
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?ordem=DESC&siglaTipo=PL&idDeputadoAutor=${deputy.id}&ano=${currentYear}&itens=10&pagina=${currentPropositionsPage}`, { signal: controller.signal });
        const json = await response.json();
        // Seta última página (paginação)
        const url = json.links.filter((link: { href: string, rel: string }) => link.rel === 'last');
        let newLastPage = url[0]?.href?.split('&').find((item: string) => item.includes('pagina'));
        newLastPage = newLastPage ? Number(newLastPage.split('=')[1]) : 1;
        setLastPropositionsPage(newLastPage);
        // Normaliza dados para garantir tipagem
  setDeputyPropositions((json.dados ?? []).map((p: Proposition) => ({
          id: p.id,
          siglaTipo: p.siglaTipo,
          numero: p.numero,
          ementa: p.ementa ?? 'Informação de Ementa não registrada',
          ano: p.ano,
          uri: p.uri ?? '',
        })));
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        console.log(e);
      } finally {
        setIsPropositionsLoading(false);
      }
    }
    fetchDeputyPropositions(selectedDeputy);
    return () => controller.abort();
  }, [selectedDeputy, currentPropositionsPage])

  // Busca despesas do deputado selecionado e página atual
  useEffect(() => {
    if (!selectedDeputy) return;
    const controller = new AbortController();
    const fetchDeputyExpenses = async (deputy: DeputyProps) => {
      setIsExpensesLoading(true);
      try {
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputy.id}/despesas?itens=10&ordem=DESC&ordenarPor=dataDocumento&pagina=${currentExpensesPage}`, { signal: controller.signal });
        const json = await response.json();
        // Seta última página (paginação)
        const url = json.links.filter((link: { href: string, rel: string }) => link.rel === 'last');
        let newLastPage = url[0]?.href?.split('&').find((item: string) => item.includes('pagina'));
        newLastPage = newLastPage ? Number(newLastPage.split('=')[1]) : 1;
        setLastExpensesPage(newLastPage);
        // Normaliza dados para garantir tipagem
  setDeputyExpenses((json.dados ?? []).map((p: Expense) => ({
          numDocumento: p.numDocumento,
          tipoDespesa: p.tipoDespesa,
          numero: p.numero,
          nomeFornecedor: p.nomeFornecedor,
          cnpjCpfFornecedor: p.cnpjCpfFornecedor,
          dataDocumento: p.dataDocumento,
          valorDocumento: p.valorDocumento,
        })));
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        console.log(e);
      } finally {
        setIsExpensesLoading(false);
      }
    }
    fetchDeputyExpenses(selectedDeputy);
    return () => controller.abort();
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
      {/* Alerta visual de erro ao buscar deputado */}
      {deputyError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-center">
          {deputyError}
        </div>
      )}
      <div className="flex md:flex-row flex-col gap-4 py-4 md:gap-2 md:py-2 max-h-[360px]">
        <ProfileCard selectedDeputy={selectedDeputy} />
        <TotalExpensesCard selectedDeputy={selectedDeputy} />
      </div>
      <div className="flex items-start md:flex-row flex-col gap-2 py-4 mb-2 md:py-2">
        {selectedDeputy &&
          <PropositionsTable
            title={"Proposições apresentados neste ano"}
            propositions={deputyPropositions}
            isLoading={isPropositionsLoading}
            currentPage={currentPropositionsPage}
            setCurrentPage={setCurrentPropositionsPage}
            lastPage={lastPropositionsPage}
            classes={"border rounded-xl py-2 md:w-1/2 w-full bg-card"}
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