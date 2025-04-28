import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import Layout from './Layout.tsx';
import Home from './Home.tsx';
import Propositions from './Propositions.tsx';
import Deps from './Deps.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/deputados" element={<Deps />}></Route>
          <Route path="/proposicoes" element={<Propositions />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
