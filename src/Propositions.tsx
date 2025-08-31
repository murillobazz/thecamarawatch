import { useState, useEffect } from 'react';
import PartiesDropdown from './components/parties-dropdown';
import { PropositionsTable } from './components/propositionsTable';
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
  const [lastPage, setLastPage] = useState(1);

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
        const currentYear = new Date().getFullYear();
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?idPartidoAutor=${selectedParty?.id}&ordem=DESC&ano=${currentYear}&itens=10&pagina=${currentPage}`);
        const json = await response.json();
        setPropositions(json.dados);
        // Seta última página
        const url = json.links.filter((link: { href: string, rel: string }) => link.rel === 'last');
        let newLastPage = url[0].href.split('&').find((item: string) => item.includes('pagina'));
        newLastPage = Number(newLastPage.split('=')[1]);
        setLastPage(newLastPage);

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
      <div className="flex justify-between items-center mb-5">
        <p className="mb-0 font-bold text-xl text-center flex flex-col">
          {selectedParty ? selectedParty.sigla : "Selecione um partido"}
          {selectedParty && <span className="text-sm font-normal">Propostas recentes</span>}
        </p>
        <PartiesDropdown parties={parties} setSelectedParty={setSelectedParty} isLoading={isLoading}></PartiesDropdown>
      </div>
      <div className="flex flex-col items-center justify-center mb-3">
        {selectedParty &&
          <PropositionsTable
            title={"Proposições apresentados neste ano"}
            propositions={propositions}
            isLoading={isLoading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
            classes={"border rounded-xl py-2 w-full"}
          >
          </PropositionsTable>
        }
      </div>
    </>
  )
}

export default Propositions;
