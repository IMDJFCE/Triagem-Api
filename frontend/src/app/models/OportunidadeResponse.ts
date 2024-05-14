import { HabilidadeResponse } from "./HabilidadeResponse";

export interface OportunidadeResponse{
    id: string;
    titulo: string;
    dataInicial: Date;
    dataFinal: Date;
    descricao: string;
    habilidades: HabilidadeResponse[];
    email: string;
}