import { Component } from '@angular/core';
import { OportunidadeResponse } from 'src/app/models/OportunidadeResponse';
import { OportunidadeService } from 'src/app/services/oportunidade/oportunidade.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.component.html',
  styleUrls: ['./oportunidades.component.scss']
})
export class OportunidadesComponent {
  oportunidades: OportunidadeResponse[] = [];
  temPermissao: boolean = false;

  constructor(private service: OportunidadeService, private usuarioService: UsuarioService){}

  ngOnInit(){
    this.service.getAllOportunidades().subscribe(data => {
      this.oportunidades = data;
    })

    this.verificarPermissao();
  }

  verificarPermissao() {
    this.usuarioService.verificarPermissao().subscribe(temPermissao => {
      this.temPermissao = temPermissao;
    });
  }
}
