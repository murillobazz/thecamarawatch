import { useEffect, useState } from "react";
// import { Skeleton } from "./components/ui/skeleton";

export default function Home() {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deputiesCount, setDeputiesCount] = useState<number | null>(null);
  const [partiesCount, setPartiesCount] = useState<number | null>(null);
  const [propositionsCount, setPropositionsCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchDeputiesCount = async () => {
      try {
        // console.log("fetchDeputies");
        // const response = await fetch(`http://localhost:8010/proxy/deputados?ordem=ASC&ordenarPor=nome`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome`);
        const json = await response.json();
        setDeputiesCount(json.dados.length);
      } catch (e) {
        console.log(e);
      }
    }

    const fetchPartiesCount = async () => {
      try {
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=nome`);
        const json = await response.json();
        setPartiesCount(json.dados.length);
      } catch (e) {
        console.log(e);
      }
    }

    const fetchPropositionsCount = async () => {
      const currentYear = new Date().getFullYear();
      const firstPage = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?ano=${currentYear}&pagina=1&itens=99&ordem=ASC&ordenarPor=id`);
      const firstJson = await firstPage.json();
      const lastPageLink = firstJson.links.find((item: { rel: string, href: string }) => item.rel === 'last').href.split('&');
      const numberOfPages = lastPageLink.find((item: string) => item.startsWith('pagina')).split('=')[1];

      const lastPage = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?ano=${currentYear}&pagina=${numberOfPages}&itens=99&ordem=ASC&ordenarPor=id`);
      const lastJson = await lastPage.json();
      const lastPageCount = lastJson.dados.length;

      const count = Math.floor((numberOfPages - 1) * 99 + lastPageCount);
      setPropositionsCount(count);
    }

    Promise.all([fetchDeputiesCount(), fetchPartiesCount(), fetchPropositionsCount()]);
    // setIsLoading(false);
  }, [])

  return (
    <div className="text-center">
      <h1>Visualização de dados abertos da Câmara de Deputados</h1>
      <p><small>Selecione uma das abas no menu acima</small></p>
      {deputiesCount && <p>Número de deputados na Câmara: {deputiesCount}</p>}
      {partiesCount && <p>Número de partidos representados na Câmara: {partiesCount}</p>}
      {propositionsCount && <p>Número de propostas apresentadas na Câmara no ano atual: {propositionsCount}</p>}
    </div>
  )
}