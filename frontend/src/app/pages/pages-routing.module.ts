import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OportunidadesComponent } from './oportunidades/oportunidades.component';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CriarOportunidadeComponent } from './oportunidades/criar-oportunidade/criar-oportunidade.component';
import { DetalhesOportunidadeComponent } from './oportunidades/detalhes-oportunidade/detalhes-oportunidade.component';
import { PerfilCandidatoComponent } from './perfil-candidato/perfil-candidato.component';
import { TriagemComponent } from './triagem/triagem.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full', 
  },
  {
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'oportunidades',
      component: OportunidadesComponent,
    },
    {
      path:'detalhes-oportunidade/:id',
      component: DetalhesOportunidadeComponent
    },
    {
      path: 'criarOportunidade',
      component: CriarOportunidadeComponent,
    },
    {
      path: 'perfil',
      component: PerfilComponent,
    },
    {
      path:'perfil-candidato',
      component: PerfilCandidatoComponent
    },
    {
      path:'detalhes-oportunidade/:id/triagem',
      component: TriagemComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
