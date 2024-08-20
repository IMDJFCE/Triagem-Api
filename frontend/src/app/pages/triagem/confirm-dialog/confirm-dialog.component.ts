import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvitationService } from "src/app/services/invitation/invitation.service";
import { UsuarioResponse } from "src/app/models/UsuarioResponse";
import { NotificationService } from 'src/app/services/notification/notification.service';

export interface ConfirmDialogData {
  oportunidadeId: string | null;
  candidatos: UsuarioResponse[];
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData, // Recebendo os dados da triagem e interface
    private InvitationService: InvitationService, // Injetando o serviço
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.sendInvitation();
  }

  sendInvitation(): void {
    const selectedCandidatos = this.data.candidatos.filter((candidato: UsuarioResponse) => candidato.select);
  
    if (selectedCandidatos.length === 0) {
      console.warn('Nenhum candidato selecionado para receber o convite.');
      return;
    }
  
    const invitationData = {
      opportunityId: this.data.oportunidadeId,
      candidatos: selectedCandidatos.map(candidato => ({
        id: candidato.id,
        name: candidato.nome // Ajuste conforme a propriedade correta do candidato
      }))
    };
  
  this.InvitationService.sendInvitation(invitationData).subscribe({
    next: (response) => {
      console.log('Convite enviado com sucesso:', response);
      this.snackBar.open('Convite enviado com sucesso', 'Fechar', {
        duration: 3000,
      });

       // Usando o NotificationService para criar notificações
    
       selectedCandidatos.forEach(candidato => {
        this.notificationService.createNotification({
          userId: candidato.id,
          message: 'Você foi selecionado para participar de um processo seletivo',
          opportunityId: this.data.oportunidadeId,
        }).subscribe({
          next: () => console.log(`Notificação enviada para o candidato ${candidato.nome}`),
          error: (error: any) => console.error(`Erro ao enviar notificação para o candidato ${candidato.nome}:`, error)
        });
      });
      this.dialogRef.close(true);
    },
    error: (error) => {
      console.error('Erro ao enviar o convite:', error);
      this.snackBar.open('Erro ao enviar o convite', 'Fechar', {
        duration: 3000,
      });
    }
  });
}
}