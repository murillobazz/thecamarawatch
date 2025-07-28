import { useState, useEffect } from 'react';
import PartiesDropdown from './components/parties-dropdown';
import { PropositionsTable } from './components/propositions-table';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

interface selectedPartyProps {
  id: string,
  sigla: string
}
// TODO - Melhorar paginação

function Propositions() {
  const [parties, setParties] = useState([]);
  const [propositions, setPropositions] = useState([]);
  const [selectedParty, setSelectedParty] = useState<selectedPartyProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchParties = async () => {
      try {
        // const response = await fetch(`http://localhost:8010/proxy/partidos?itens=99`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/partidos?itens=99`);
        const json = await response.json();
        setParties(json.dados);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
      setIsLoading(false);
    }

    fetchParties();
  }, []);

  useEffect(() => {
    const fetchPropositions = async () => {
      setIsLoading(true);
      try {
        const date = { from: new Date(2024, 0, 1), to: new Date(2025, 0, 1) }
        // const response = await fetch(`http://localhost:8010/proxy/proposicoes?idPartidoAutor=${selectedParty.id}&ordem=DESC&dataInicio=${date.from.toISOString().split('T')[0]}&dataFim=${date.to.toISOString().split('T')[0]}`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?idPartidoAutor=${selectedParty?.id}&ordem=DESC&dataInicio=${date.from.toISOString().split('T')[0]}&dataFim=${date.to.toISOString().split('T')[0]}&itens=10&pagina=${currentPage}`);
        const json = await response.json();
        setPropositions(json.dados);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
      setIsLoading(false);
    }

    if (selectedParty) {
      fetchPropositions();
    }
  }, [selectedParty, currentPage])

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <p className="mb-0 font-bold text-xl text-center flex flex-col">
          {selectedParty ? selectedParty.sigla : "Selecione um partido"}
          {selectedParty && <span className="text-sm font-normal">Propostas recentes</span>}
        </p>
        <PartiesDropdown parties={parties} setSelectedParty={setSelectedParty} isLoading={isLoading}></PartiesDropdown>
      </div>
      <div className="flex flex-col items-center justify-center mb-3">
        {selectedParty && <PropositionsTable propositions={propositions} isLoading={isLoading}></PropositionsTable>}
        {selectedParty &&
          <div className="flex gap-1 mt-2">
            <Button variant="ghost" className="hover:cursor-pointer" disabled={currentPage === 1 || isLoading} onClick={() => setCurrentPage(currentPage - 1)}>
              Anterior
            </Button>
            <Input type="number" value={currentPage} onChange={(event) => setCurrentPage(Number(event.target.value))} disabled={isLoading} className="w-16 text-center"></Input>
            <Button variant="ghost" className="hover:cursor-pointer" onClick={() => setCurrentPage(currentPage + 1)} disabled={isLoading}>
              Próximo
            </Button>
          </div>
        }
      </div>
    </>
  )
}

export default Propositions;
