import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import '@/global.css';
import Nav from './components/nav';
import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";

function Layout() {
  return (
    <ThemeProvider>
      <header>
        <nav className="flex flex-col sm:flex-row gap-[1ch]">
          <Link className="flex items-center" to="/" viewTransition>
            <div className="text-left">
              <h1 className="font-bold tracking-tighter">TheCamaraWatch</h1><Separator />
              {/* <p><small>Dados sobre a Câmara dos Deputados</small></p> */}
            </div>
          </Link>
          <Nav></Nav>
        </nav>
        <ModeToggle></ModeToggle>
      </header>
      <Separator></Separator>
      <main>
        <Outlet />
      </main>
      <footer className="absolute bottom-0 w-full flex justify-center p-1">
        <p className="text-xs">Made by <a href="https://github.com/murillobazz" target="_blank" className="font-bold">murillobazz</a></p>
      </footer>
    </ThemeProvider>
  );
};

export default Layout;