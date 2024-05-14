import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabilidadeRequest } from 'src/app/models/HabilidadeRequest';
import { HabilidadeTipo } from 'src/app/models/HabilidadeTipo';
import { OportunidadeResponse } from 'src/app/models/OportunidadeResponse';
import { OportunidadeService } from 'src/app/services/oportunidade/oportunidade.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-detalhes-oportunidade',
  templateUrl: './detalhes-oportunidade.component.html',
  styleUrls: ['./detalhes-oportunidade.component.scss']
})
export class DetalhesOportunidadeComponent {
  oportunidade?: OportunidadeResponse;
  habilidadesTecnicas: HabilidadeRequest[] = [];
  habilidadesComportamentais: HabilidadeRequest[] = [];
  oportunidadeId: string | null = null;
  temPermissao: boolean = false;

  constructor(private route: ActivatedRoute, private oportunidadeService: OportunidadeService, private usuarioService: UsuarioService){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.oportunidadeId = params.get('id');
      if (this.oportunidadeId !== null) {
        this.oportunidadeService.getOportunidadeById(this.oportunidadeId).subscribe(data => {
          this.oportunidade = data;
          this.separarHabilidades(this.oportunidade.habilidades);
        });
      }
    });

    this.verificarPermissao();
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

  verificarPermissao() {
    this.usuarioService.verificarPermissao().subscribe(temPermissao => {
      this.temPermissao = temPermissao;
    });
  }
}
