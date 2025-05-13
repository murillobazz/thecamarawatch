import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const statesList = [
  // Região Norte - Verde claro
  { name: "AC", value: 0, fill: "#81C785" },
  { name: "AP", value: 0, fill: "#71AD74" },
  { name: "AM", value: 0, fill: "#609463" },
  { name: "PA", value: 0, fill: "#507A52" },
  { name: "RO", value: 0, fill: "#3F6141" },
  { name: "RR", value: 0, fill: "#A2FAA7" },
  { name: "TO", value: 0, fill: "#2E4730" },

  // Região Nordeste – Laranja avermelhado suave
  { name: "AL", value: 0, fill: "#ffccbc" },
  { name: "BA", value: 0, fill: "#ffab91" },
  { name: "CE", value: 0, fill: "#ff8a65" },
  { name: "MA", value: 0, fill: "#ff7043" },
  { name: "PB", value: 0, fill: "#ffccbc" },
  { name: "PE", value: 0, fill: "#ffab91" },
  { name: "PI", value: 0, fill: "#ff8a65" },
  { name: "RN", value: 0, fill: "#ffb199" },
  { name: "SE", value: 0, fill: "#ffab91" },

  // Região Centro-Oeste – Amarelo esverdeado suave
  { name: "DF", value: 0, fill: "#f0f4c3" },
  { name: "GO", value: 0, fill: "#e6ee9c" },
  { name: "MT", value: 0, fill: "#dce775" },
  { name: "MS", value: 0, fill: "#d4e157" },

  // Região Sudeste - Azul claro
  { name: "ES", value: 0, fill: "#bbdefb" },
  { name: "MG", value: 0, fill: "#90caf9" },
  { name: "RJ", value: 0, fill: "#64b5f6" },
  { name: "SP", value: 0, fill: "#42a5f5" },

  // Região Sul - Roxo suave
  { name: "PR", value: 0, fill: "#e1bee7" },
  { name: "RS", value: 0, fill: "#ce93d8" },
  { name: "SC", value: 0, fill: "#ba68c8" }
];