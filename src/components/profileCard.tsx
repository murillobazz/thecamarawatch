import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfileCard({ selectedDeputy }) {
  if (selectedDeputy) {
    return (
      <Card className="p-4 w-full max-w-[420px]">
        <div className="flex gap-4">
          <Avatar className="w-[64px] h-[64px]">
            <AvatarImage src={selectedDeputy.ultimoStatus.urlFoto} />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
          <div className="text-left">
            <h2 className="text-xl font-bold">{selectedDeputy.ultimoStatus.nomeEleitoral}</h2>
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