import { useEffect, useState } from "react";
import CustomCard from "./components/customCard";
import DeputiesStateChart from "./components/deputiesStateChart";
import { CardContent } from "./components/ui/card";
import { format } from "date-fns";
import { statesList } from "./lib/utils";
import { Skeleton } from "./components/ui/skeleton";

type Deputy = {
  siglaUf: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deputiesCount, setDeputiesCount] = useState<number | null>(null);
  const [partiesCount, setPartiesCount] = useState<number | null>(null);
  const [propositionsCount, setPropositionsCount] = useState<number | null>(null);
  const [statesCount, setStatesCount] = useState<object[] | null>(null);

  useEffect(() => {
    const fetchDeputiesCount = async () => {
      try {
        // const response = await fetch(`http://localhost:8010/proxy/deputados?ordem=ASC&ordenarPor=nome`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome`);
        const json = await response.json();
        setDeputiesCount(json.dados.length);

        const countArray = statesList;
        const deputies = json.dados;
        deputies.forEach((deputy: Deputy) => countArray.map(item => deputy.siglaUf === item.name ? item.value++ : null));
        setStatesCount(countArray);
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
      const yearStart = format(new Date(currentYear, 0, 1), "yyyy-MM-dd");
      const yearEnd = format(new Date(currentYear, 11, 31), "yyyy-MM-dd");
      // const firstPage = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?ano=${currentYear}&pagina=1&itens=99&ordem=ASC&ordenarPor=id`);
      const firstPage = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?dataApresentacaoInicio=${yearStart}&dataApresentacaoFim=${yearEnd}&pagina=1&itens=99&ordem=ASC&ordenarPor=id`);
      const firstJson = await firstPage.json();
      const lastPageLink = firstJson.links.find((item: { rel: string, href: string }) => item.rel === 'last').href.split('&');
      const numberOfPages = lastPageLink.find((item: string) => item.startsWith('pagina')).split('=')[1];

      // const lastPage = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?ano=${currentYear}&pagina=${numberOfPages}&itens=99&ordem=ASC&ordenarPor=id`);
      const lastPage = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?dataApresentacaoInicio=${yearStart}&dataApresentacaoFim=${yearEnd}&pagina=${numberOfPages}&itens=99&ordem=ASC&ordenarPor=id`);
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
      <div className="mb-4">
        <h1 className="font-bold">Visualização de dados abertos da Câmara de Deputados</h1>
        {/* <p><small>Selecione uma das abas no menu acima</small></p> */}
      </div>
      <div className="flex md:flex-row flex-col gap-2 max-w-full mx-auto">
        <div className="grid grid-rows-3 grid-cols-1 gap-2">
          <CustomCard isLoading={isLoading}>
            <CardContent className="h-full flex flex-col justify-between text-left">
              <p><b>Deputados</b> em exercício</p>
              {
                deputiesCount ?
                  <p className="text-[2.4rem] font-bold">{deputiesCount}</p> :
                  <Skeleton className="h-[2.4rem] w-[3rem] mt-4"></Skeleton>
              }
            </CardContent>
          </CustomCard>
          <CustomCard isLoading={isLoading}>
            <CardContent className="h-full flex flex-col justify-between text-left">
              <p><b>Partidos</b> representados</p>
              {
                partiesCount ? 
                  <p className="text-[2.4rem] font-bold">{partiesCount}</p> :
                  <Skeleton className="h-[2.4rem] w-[3rem] mt-4"></Skeleton>
              }
            </CardContent>
          </CustomCard>
          <CustomCard isLoading={isLoading}>
            <CardContent className="h-full flex flex-col justify-between text-left">
              <p><b>Propostas</b> apresentadas no ano atual</p>
              {
                propositionsCount ? 
                  <p className="text-[2.4rem] font-bold">{propositionsCount.toLocaleString('pt-br')}</p> :
                  <Skeleton className="h-[2.4rem] w-[6rem] mt-4"></Skeleton>
              }
            </CardContent>
          </CustomCard>
        </div>
        <div className="">
          <CustomCard isLoading={isLoading}>
            <CardContent className="h-full flex flex-col justify-between text-left">
              <p><b>Deputados</b> por estado</p>
              {
                statesCount ?
                <DeputiesStateChart chartData={statesCount}></DeputiesStateChart> :
                <Skeleton className="h-[400px] md:w-[400px] w-max-full mt-4"></Skeleton>
              }
            </CardContent>
          </CustomCard>
        </div>
      </div>
    </>
  )
}