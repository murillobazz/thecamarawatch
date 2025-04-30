import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import DeputyProps from "@/types/deputyProps";

export default function TotalExpensesCard({ selectedDeputy }: { selectedDeputy: DeputyProps | null }) {
  // TODO -> Criar um componente "CardContainer" que faça o fetch dos "expenses", para que este state seja utilizado em mais de um card
  // Não está sendo utilizado aqui no momento, porém pode ser utilizado em um card com os tipos de gastos por exemplo.
  // const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {     
    // TODO -> Adicionar um loading para atualização dos valores (está com delay entre o profileCard e o totalExpensesCard)
    const fetchExpenses = async () => {
      try {
        // let response = await fetch(`http://localhost:8010/proxy/deputados/${selectedDeputy?.id}/despesas?idLegislatura=${selectedDeputy?.ultimoStatus.idLegislatura}&pagina=1&&ano=2025&itens=100&ordem=DESC&ordenarPor=idLegislatura`);
        let response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${selectedDeputy?.id}/despesas?idLegislatura=${selectedDeputy?.ultimoStatus.idLegislatura}&pagina=1&&ano=2025&itens=100&ordem=DESC&ordenarPor=idLegislatura`);
        let json = await response.json();
        let allExpenses = ([...json.dados]);
        
        while (json.links[1]?.rel === "next") {
          // console.log("whileloop")
          response = await fetch(json.links[1]?.href);
          json = await response.json();
          allExpenses = [...allExpenses, ...json.dados];
        }

        // console.log("allExpenses", allExpenses);

        const reducedExpenses = allExpenses.reduce((acc, item) => acc + Math.floor(item.valorLiquido), 0);
        // console.log(reducedExpenses);

        // setExpenses(allExpenses);
        setTotal(reducedExpenses);

      } catch (e) {
        console.log(e);
      }
    }

    if (selectedDeputy) {
      fetchExpenses();
    }
  }, [selectedDeputy])

  if (selectedDeputy) {
    return (
      <Card className="w-full max-w-[420px]">
        <CardHeader>
          <CardTitle>Gasto Total</CardTitle>
          <CardDescription>Valor total gasto pelo deputado em seu atual mandato</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-bold">{total ? total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "-"}</h2>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>

    </div>
  )
}