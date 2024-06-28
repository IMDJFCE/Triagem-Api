import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from "@angular/material/dialog";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  readonly dialog = inject(MatDialog);

  openDialog(data: any) {
    const dialogRef = this.dialog.open(ModalContent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: "modal-content",
  templateUrl: "./modal-dialog.component.html",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get usuario() {
    return this.data.usuario;
  }
}
