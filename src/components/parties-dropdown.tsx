import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface partiesDropdownProps {
  parties: Array<{ id: string; sigla: string }>,
  setSelectedParty: (party: { id: string; sigla: string }) => void,
  isLoading: boolean
}

export default function PartiesDropdown({ parties, setSelectedParty, isLoading }: partiesDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading ? true : false}>
        <Button variant="outline" className="hover:cursor-pointer">{isLoading ? "Carregando..." : "Selecionar"}</Button>
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
