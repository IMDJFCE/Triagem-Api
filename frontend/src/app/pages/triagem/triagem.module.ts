import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { TriagemComponent } from "./triagem.component";
import { ModalComponent, ModalContent } from "./modal/modal.component"; // Importar ModalComponent e ModalContent

@NgModule({
  declarations: [TriagemComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    ModalComponent,
    ModalContent,
  ],
})
export class TriagemModule {}
