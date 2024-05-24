import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuarioResponse } from 'src/app/models/UsuarioResponse';
import { ActivatedRoute } from '@angular/router'; 
import { TriagemService } from 'src/app/services/triagem/triagem.service'; 
import { RacaDescricao } from 'src/app/models/RacaDescricao';
import { GeneroDescricao } from 'src/app/models/GeneroDescricao';

@Component({
  selector: 'app-triagem',
  templateUrl: './triagem.component.html',
  styleUrls: ['./triagem.component.scss']
})

export class TriagemComponent implements OnInit {
  usuariosTriados: UsuarioResponse[] = [];
  mostrarUsuarios: UsuarioResponse[] = [];
  existeUsuarios: boolean = true;
  oportunidadeId: string | null = null;
  filtroTodosSelecionado: boolean = false;

  parentSelector: boolean = false;
  candidato: any[] = [];
  toppings = new FormControl('');
  toppingList: string[] = ['Todos', 'Mulheres', 'Pretos, pardos e indígenas', 'Deficientes', 'Mostrar nomes'];

  constructor(private triagemService: TriagemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.oportunidadeId = params.get('id');
      if (this.oportunidadeId !== null) {
        this.triagemService.triarUsuariosParaOportunidade(this.oportunidadeId).subscribe(data => {
          this.usuariosTriados = data;
          this.VerificarExistenciaUsuarios(this.usuariosTriados); 
          this.esconderNomes(this.usuariosTriados);
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

  VerificarExistenciaUsuarios(usuarios: UsuarioResponse[]) {
    if (usuarios.length === 0) {
      this.existeUsuarios = false;
    }
  }

  esconderNomes(usuarios: UsuarioResponse[]){
    if(usuarios.length > 0){
      this.mostrarUsuarios = usuarios.map((usuario, index) => {
        return { ...usuario, nome: `Candidato ${index + 1}` };
      });
    }
  }

  aplicarFiltros(){
    if (this.toppings.value) {
      let usuariosFiltrados = this.usuariosTriados;
      
      // Verificar se o filtro "Todos" foi selecionado
      if (this.toppings.value.includes('Todos')) {
        this.filtroTodosSelecionado = true;
      }else{
        this.filtroTodosSelecionado = false;
      }
  
      // Verificar se o filtro de gênero foi selecionado
      if (this.toppings.value.includes('Mulheres')) {
        usuariosFiltrados = usuariosFiltrados.filter(usuario => {
          return usuario.genero?.descricao === GeneroDescricao.FEMININO;
        });
      }
  
      // Verificar se o filtro de raça foi selecionado
      if (this.toppings.value.includes('Pretos, pardos e indígenas')) {
        usuariosFiltrados = usuariosFiltrados.filter(usuario => {
          return (
            usuario.raca?.descricao === RacaDescricao.PARDO ||
            usuario.raca?.descricao === RacaDescricao.PRETO ||
            usuario.raca?.descricao === RacaDescricao.INDIGENA
          );
        });
      }

      // Verificar se o filtro de deficientes foi selecionado
      if (this.toppings.value.includes('Deficientes')) {
        usuariosFiltrados = usuariosFiltrados.filter(usuario => {
          return usuario.deficiencias != undefined && usuario.deficiencias?.length > 0;
        });
      }
  
      // Verificar se o filtro de mostrar nomes foi selecionado
      if (this.toppings.value.includes('Mostrar nomes')) {
        this.mostrarUsuarios = usuariosFiltrados;
      }else{
        this.esconderNomes(usuariosFiltrados);
      }
    }
  }

}