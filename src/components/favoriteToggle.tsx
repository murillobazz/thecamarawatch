import { Star } from "lucide-react";

export default function FavoriteToggle({ isToggled }: { isToggled: boolean }) {
  return (
    <div className={
      isToggled ?
      "rounded-full border-2 border-solid p-2 bg-foreground text-yellow-500 hover:cursor-pointer" :
      "rounded-full border-2 border-solid p-2 hover:bg-foreground hover:text-yellow-500 hover:cursor-pointer"
    }>
      <Star size={16}/>
    </div>
  )
}