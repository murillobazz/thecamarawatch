import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function PartiesDropdown({ parties, setSelectedParty, isLoading }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading ? true : false}>
        <Button variant="outline" className="hover:cursor-pointer">{isLoading ? "Carregando..." : "Selecione um Partido"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {parties && parties.map((item: { id: string; sigla: string; }) => {
          return (
            <DropdownMenuItem key={item.id} onClick={() => setSelectedParty(item)}>{item.sigla}</DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
  </DropdownMenu>
  )
}
