import { useEffect, useState } from "react";
import CustomCard from "./components/customCard";
import { CardContent } from "./components/ui/card";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    setIsLoading(false);
  }, [])

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="font-bold">Visualização de dados abertos da Câmara de Deputados</h1>
        <p><small>Selecione uma das abas no menu acima</small></p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 grid-rows-3 gap-2 max-w-fit mx-auto">
        <CustomCard isLoading={isLoading}>
          <CardContent className="h-full flex flex-col justify-between text-left">
            <p><b>Deputados</b> em exercício</p>
            {deputiesCount && <p className="text-[2.4rem] font-bold">{deputiesCount}</p>}
          </CardContent>
        </CustomCard>
        <CustomCard isLoading={isLoading}>
          <CardContent className="h-full flex flex-col justify-between text-left">
            <p><b>Partidos</b> representados</p>
            {partiesCount && <p className="text-[2.4rem] font-bold">{partiesCount}</p>}
          </CardContent>
        </CustomCard>
        <CustomCard isLoading={isLoading}>
          <CardContent className="h-full flex flex-col justify-between text-left">
            <p><b>Propostas</b> apresentadas no ano atual</p>
            {propositionsCount && <p className="text-[2.4rem] font-bold">{propositionsCount}</p>}
          </CardContent>
        </CustomCard>
      </div>
    </>
  )
}