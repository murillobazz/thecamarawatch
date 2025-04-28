import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { DatePicker } from "@/components/ui/datepicker";
import MyChart from "@/components/ui/mychart";
import PartiesDropdown from './components/parties-dropdown';
import { PropositionsTable } from './components/propositions-table';


function Propositions() {
  const [parties, setParties] = useState([]);
  const [propositions, setPropositions] = useState([]);
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date(2024, 0, 1), to: new Date(2025, 0, 1) });
  const [selectedParty, setSelectedParty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDate = (date: never) => {
    setDate(date);
  };

  useEffect(() => {
    const fetchParties = async () => {
      try {
        // const response = await fetch(`http://localhost:8010/proxy/partidos?itens=99`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/partidos?itens=99`);
        const json = await response.json();
        setParties(json.dados);
        // console.log(parties);
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
        // const response = await fetch(`http://localhost:8010/proxy/proposicoes?idPartidoAutor=${selectedParty.id}&ordem=DESC&dataInicio=${date.from.toISOString().split('T')[0]}&dataFim=${date.to.toISOString().split('T')[0]}`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?idPartidoAutor=${selectedParty.id}&ordem=DESC&dataInicio=${date.from.toISOString().split('T')[0]}&dataFim=${date.to.toISOString().split('T')[0]}`);
        const json = await response.json();
        setPropositions(json.dados);
        // console.log(propositions);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
      setIsLoading(false);
    }

    if (selectedParty) {
      fetchPropositions();
    }
  }, [selectedParty])

  return (
    <>
      <div className="flex justify-between mb-3">
        {/* <DatePicker sendDateToParent={handleDate}></DatePicker> */}
        <PartiesDropdown parties={parties} setSelectedParty={setSelectedParty} isLoading={isLoading}></PartiesDropdown>
      </div>
      <div className="flex flex-col items-center justify-center mb-3">
        {selectedParty && <p className="mb-3 font-bold text-xl">{selectedParty.sigla}</p>}
        {/* {propositions && propositions.map((item) => {
        return (
          <div key={item.id} className="mb-4">
            <p>{item.ementa}</p>
            <p>{item.ano}</p>
          </div>
        )
      })} */}
        <PropositionsTable propositions={propositions} isLoading={isLoading}></PropositionsTable>
        {/* <MyChart propositions={propositions} parties={parties}></MyChart> */}
      </div>
    </>
  )
}

export default Propositions;
