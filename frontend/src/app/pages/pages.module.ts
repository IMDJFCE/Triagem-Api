import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OportunidadesModule } from './oportunidades/oportunidades.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PerfilModule } from './perfil/perfil.module';
import { HomeModule } from './home/home.module';
import { VinculoModule } from './vinculo/vinculo.module';
import { CriarOportunidadeModule } from './oportunidades/criar-oportunidade/criar-oportunidade.module';
import { PerfilCandidatoModule } from './perfil-candidato/perfil-candidato.module';
import {MatListModule} from '@angular/material/list';
import { TriagemModule } from './triagem/triagem.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    declarations: [
        PagesComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        HomeModule,
        OportunidadesModule,
        CriarOportunidadeModule,
        PerfilModule,
        VinculoModule,
        PerfilCandidatoModule,
        MatListModule,
        TriagemModule,
        MatPaginatorModule
    ]
})
export class PagesModule { }
