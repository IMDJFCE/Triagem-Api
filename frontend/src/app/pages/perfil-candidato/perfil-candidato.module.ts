import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PerfilCandidatoComponent} from './perfil-candidato.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        PerfilCandidatoComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ComponentsModule,
        RouterModule
    ]
})
export class PerfilCandidatoModule { }
