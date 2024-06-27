import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OportunidadesComponent } from './oportunidades.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DetalhesOportunidadeComponent } from './detalhes-oportunidade/detalhes-oportunidade.component';



@NgModule({
  declarations: [
    OportunidadesComponent,
    DetalhesOportunidadeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ]
})
export class OportunidadesModule { }
