import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  // CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import DeputyProps from '@/types/deputyProps';
import FavoriteToggle from '@/components/favoriteToggle';

export default function ProfileCard({ selectedDeputy }: { selectedDeputy: DeputyProps | null }) {
  if (selectedDeputy) {
    return (
      <Card className="p-6 w-full h-full max-w-[420px]">
        <div className="flex gap-4">
          <Avatar className="w-[64px] h-[64px]">
            <AvatarImage src={selectedDeputy.ultimoStatus.urlFoto} />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
          <div className="text-left w-full">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">{selectedDeputy.ultimoStatus.nomeEleitoral}</h2>
              <FavoriteToggle isToggled={false}></FavoriteToggle>
            </div>
            <p>{selectedDeputy.ultimoStatus.siglaPartido} - {selectedDeputy.ultimoStatus.siglaUf}</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div>
      <p className="text-gray-500 text-sm">Selecione um deputado para visualizar seus dados</p>
    </div>
  )
}