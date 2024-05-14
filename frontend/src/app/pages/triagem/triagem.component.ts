import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UsuarioResponse } from 'src/app/models/UsuarioResponse';
import { ActivatedRoute } from '@angular/router'; // Adicionando esta importação
import { TriagemService } from 'src/app/services/triagem/triagem.service'; // Adicionando esta importação

@Component({
  selector: 'app-triagem',
  templateUrl: './triagem.component.html',
  styleUrls: ['./triagem.component.scss']
})

export class TriagemComponent implements OnInit {
  usuariosTriados: UsuarioResponse[] = [];
  existeUsuarios: boolean = true;
  oportunidadeId: string | null = null;

  title = 'Nome';
  parentSelector: boolean = false;
  candidato: any[] = [];
  toppings = new FormControl('');
  toppingList: string[] = ['Todos', 'Mulheres', 'Pretos, pardos e indígenas', 'Deficientes', 'Mostrar nomes'];

  constructor(private usuarioService: UsuarioService, private triagemService: TriagemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.oportunidadeId = params.get('id');
      if (this.oportunidadeId !== null) {
        this.triagemService.triarUsuariosParaOportunidade(this.oportunidadeId).subscribe(data => {
          this.usuariosTriados = data;
          this.getUsuariosTriados(this.usuariosTriados); 
        })
      }
    });
  }

  onChangeCandidato(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const id = checkbox.value;
    const isChecked = checkbox.checked;
    
    this.candidato = this.candidato.map((d) => {
      const id = parseInt(checkbox.value, 10);
      if(d.id == id){
        d.select = isChecked;
        this.parentSelector = false;
        return d;
      }
      if (id === -1) {
        d.select = this.parentSelector;
        return d;
      } 
      return d;
    });
    console.log(id, isChecked);
  }

  getUsuariosTriados(usuarios: UsuarioResponse[]) {
    if (usuarios.length === 0) {
      this.existeUsuarios = false;
    }
  }
}