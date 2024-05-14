import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ContentComponent } from '../perfil/content/content.component';
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
        ContentComponent,
        RouterModule
    ]
})
export class PerfilCandidatoModule { }
