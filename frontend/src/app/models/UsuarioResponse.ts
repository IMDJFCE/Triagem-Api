import { DeficienciaResponse } from "./DeficienciaResponse";
import { Genero } from "./Genero";
import { HabilidadeResponse } from "./HabilidadeResponse";
import { Raca } from "./Raca";

export interface UsuarioResponse{
    id: number;
    nome: string;
    email: string;
    dataNascimento: Date;
    matricula: string;
    tipo: string;
    genero?: Genero;
    raca?: Raca;
    habilidades?: HabilidadeResponse[];
    deficiencias?: DeficienciaResponse[];
}