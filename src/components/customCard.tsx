import { Card } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import { ReactElement } from "react";

interface customCardProps {
  children: ReactElement,
  isLoading: boolean,
}

export default function CustomCard({ children, isLoading }: customCardProps) {
  if (isLoading) {
    return (
      <Skeleton className="w-[360px] h-[120px]">
      </Skeleton>
    )
  }

  return (
    <Card className="max-w-full">
      {children}
    </Card>
  )
}