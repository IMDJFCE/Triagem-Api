import { HabilidadeRequest } from "./HabilidadeRequest";

export interface OportunidadeRequest {
    titulo: string;
    dataInicial: Date;
    dataFinal: Date;
    descricao: string;
    habilidades: HabilidadeRequest[];
    email: string;
}