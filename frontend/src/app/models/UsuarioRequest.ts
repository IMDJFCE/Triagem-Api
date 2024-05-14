import { DeficienciaRequest } from "./DeficienciaRequest";
import { Genero } from "./Genero";
import { HabilidadeRequest } from "./HabilidadeRequest";
import { Raca } from "./Raca";

export interface UsuarioRequest{
    nome: string;
    email: string;
    senha: string;
    dataNascimento: Date;
    matricula: string;
    genero?: Genero;
    raca?: Raca;
    habilidades?: HabilidadeRequest[];
    deficiencias?: DeficienciaRequest[];
}