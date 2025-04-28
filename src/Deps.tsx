import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileCard from '@/components/profileCard';
import TotalExpensesCard from '@/components/totalExpensesCard';



function Deps() {
  const [deputies, setDeputies] = useState([]);
  const [filteredDeputies, setFilteredDeputies] = useState([]);
  const [selectedDeputy, setSelectedDeputy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deputyId, setDeputyId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (deputy: object) => {
    setOpen(false);
    setIsLoading(true);
    setDeputyId(deputy.id);
  }

  useEffect(() => {
    const fetchDeputies = async () => {
      try {
        console.log("fetchDeputies");
        const response = await fetch(`http://localhost:8010/proxy/deputados?ordem=ASC&ordenarPor=nome`);
        const json = await response.json();
        setDeputies(json.dados);
      } catch (e) {
        console.log(e);
      }
    }

    fetchDeputies();
  }, [])

  useEffect(() => {
    const fetchDeputy = async (id) => {
      try {
        // const response = await fetch(`http://localhost:8010/proxy/deputados/${id}`);
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proxy/deputados/${id}`);
        const json = await response.json();
        setSelectedDeputy(json.dados);
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    }

    if (deputyId) {
      fetchDeputy(deputyId);
    }
  }, [deputyId])

  useEffect(() => {
    const filteredDeputies = deputies
      .filter(deputy =>
        deputy.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 20);
    if (searchTerm) setFilteredDeputies(filteredDeputies);
  }, [searchTerm, deputies])

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
              {filteredDeputies && filteredDeputies.map((deputy) => {
                return (
                  <div className="hover:cursor-pointer hover:bg-accent pt-2">
                    <Button variant="link" onClick={() => handleClick(deputy)} key={deputy.id} className="text-sm text-center pb-2">
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
    </>
  )
}

export default Deps;