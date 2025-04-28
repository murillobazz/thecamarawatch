"use client";
import { Link } from "react-router";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link to="/deputados">
            <p className="text-xs">Deputados</p>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link to="/proposicoes">
            <p className="text-xs">Proposições</p>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
