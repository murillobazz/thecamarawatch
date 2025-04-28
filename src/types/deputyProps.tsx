export default interface DeputyProps {
  id: number,
  nome: string, 
  ultimoStatus: { urlFoto: string, siglaPartido: string, nomeEleitoral: string, siglaUf: string, idLegislatura: string },
}