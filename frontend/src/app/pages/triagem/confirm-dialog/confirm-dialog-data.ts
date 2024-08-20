import { UsuarioResponse } from "src/app/models/UsuarioResponse";

export interface ConfirmDialogData {
  oportunidadeId: string | null;
  candidatos: UsuarioResponse[];
}