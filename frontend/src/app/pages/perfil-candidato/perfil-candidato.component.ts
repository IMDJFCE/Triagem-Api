import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabilidadeRequest } from 'src/app/models/HabilidadeRequest';
import { HabilidadeTipo } from 'src/app/models/HabilidadeTipo';
import { OportunidadeResponse } from 'src/app/models/OportunidadeResponse';
import { UsuarioRequest } from 'src/app/models/UsuarioRequest';
import { UsuarioResponse } from 'src/app/models/UsuarioResponse';
import { OportunidadeService } from 'src/app/services/oportunidade/oportunidade.service';

@Component({
  selector: 'app-perfil-candidato',
  templateUrl: './perfil-candidato.component.html',
  styleUrls: ['./perfil-candidato.component.scss']
})

export class PerfilCandidatoComponent {
  perfilcandidato?: UsuarioResponse;
  nome: UsuarioRequest [] = [];
  email: UsuarioRequest [] = [];
  matricula:UsuarioRequest [] = [];
  dataNascimento:UsuarioRequest [] = [];
  senha: UsuarioRequest [] = [];
  oportunidade?: OportunidadeResponse;
  habilidadesTecnicas: HabilidadeRequest[] = [];
  habilidadesComportamentais: HabilidadeRequest[] = [];


  constructor(private route: ActivatedRoute, private oportunidadeService: OportunidadeService){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const oportunidadeId = params.get('id');
      if (oportunidadeId !== null) {
        this.oportunidadeService.getOportunidadeById(oportunidadeId).subscribe(data => {
          this.oportunidade = data;
          this.separarHabilidades(this.oportunidade.habilidades);
        });
      }
    });
  }

  separarHabilidades(habilidades: HabilidadeRequest[]){
    for(let habilidade of habilidades){
      if(habilidade.tipo == HabilidadeTipo.TECNICA){
        this.habilidadesTecnicas.push(habilidade);
      }else{
        this.habilidadesComportamentais.push(habilidade);
      }
    }
  }
}
