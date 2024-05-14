import { HabilidadeTipo } from "./HabilidadeTipo";

export interface HabilidadeResponse {
    id: number;
    nome: string;
    tipo: HabilidadeTipo; 
}