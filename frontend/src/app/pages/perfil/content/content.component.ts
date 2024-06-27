import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UsuarioRequest } from 'src/app/models/UsuarioRequest';
import { GeneroDescricao } from 'src/app/models/GeneroDescricao';
import { RacaDescricao } from 'src/app/models/RacaDescricao';
import { DeficienciaRequest } from 'src/app/models/DeficienciaRequest';
import { Genero } from 'src/app/models/Genero';
import { Raca } from 'src/app/models/Raca';
import { HabilidadeRequest } from 'src/app/models/HabilidadeRequest';
import { HabilidadeTipo } from 'src/app/models/HabilidadeTipo';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})

export class ContentComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    habilidadesSelect: new FormControl([], Validators.required)
  });

  secondFormGroup = this._formBuilder.group({
    lattesControl: this._formBuilder.control('', [Validators.required]), // Variável para o currículo Lattes
    linkedinControl: this._formBuilder.control('', [Validators.required]), // Variável para o LinkedIn
    externoControl: this._formBuilder.control('', [Validators.required]) // Variável para o currículo externo
  });
  
  thirdFormGroup = this._formBuilder.group({
  selectControlGenero: this._formBuilder.control(GeneroDescricao.MASCULINO, [Validators.required]),
  selectControlEtnia: this._formBuilder.control(RacaDescricao.PARDO, [Validators.required]),
  selectControlDeficiencia: this._formBuilder.control('', [Validators.required]),
  textControl: this._formBuilder.control('', [Validators.required])
  });

  racaDescricao = RacaDescricao;
  generoDescricao = GeneroDescricao;

  skills: HabilidadeRequest[] = [{nome: 'Lógica', tipo: HabilidadeTipo.TECNICA}, {nome: 'Testes Unitários', tipo: HabilidadeTipo.TECNICA}];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  announcer = inject(LiveAnnouncer);
  habilidadesSelecionadas: HabilidadeRequest[] = [];

  habilidadesComportamentais: HabilidadeRequest[] = [
    {nome: 'Adaptabilidade', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Atenção aos detalhes', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Atitude positiva', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Colaboração', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Comunicação eficaz', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Criatividade', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Empatia', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Gestão de conflitos', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Gestão do tempo', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Inteligência emocional', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Liderança', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Negociação', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Organização', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Pensamento crítico', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Proatividade', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Resiliência', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Resolução de problemas', tipo: HabilidadeTipo.COMPORTAMENTAL},
    {nome: 'Tomada de decisão', tipo: HabilidadeTipo.COMPORTAMENTAL}
  ];

  constructor(private _formBuilder: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit() {}

  finalizar(){
    this.adicionarHabilidadesTecnicasSelecionadas();
    const firstFormGroupValues = this.thirdFormGroup.value;
    let deficiencias: DeficienciaRequest[] = [];
    if (Array.isArray(firstFormGroupValues.textControl)) {
      deficiencias = firstFormGroupValues.textControl.map(descricao => ({ descricao }));
    }
    
    let genero: Genero | undefined;
    if (firstFormGroupValues.selectControlGenero != null && firstFormGroupValues.selectControlGenero !== undefined) {
      genero = { descricao: firstFormGroupValues.selectControlGenero };
    }

    let raca: Raca | undefined;
    if(firstFormGroupValues.selectControlEtnia != null && firstFormGroupValues.selectControlEtnia !== undefined){
      raca = { descricao: firstFormGroupValues.selectControlEtnia };
    }

    const usuarioRequest: UsuarioRequest = {
      nome: "Cleiton",
      email: "cleiton@gmail.com",
      senha: "senhaQualquer",
      dataNascimento: new Date("1999-05-20"),
      matricula: "2024001",
      genero: genero,
      raca: raca,
      habilidades: this.habilidadesSelecionadas,
      deficiencias: deficiencias
    }

    this.usuarioService.createUsuario(usuarioRequest).subscribe({
      next: (response) => {
        alert('Usuário criado com sucesso"');
        console.log(response);
        // this.router.navigate(['perfil-candidato/:id']);
      },
      error: (error) => {
        alert('Erro ao criar Usuário:\n' + JSON.stringify(error, null, 2));
        console.log(error);
      }
    });
  }

  adicionarHabilidadesTecnicasSelecionadas(): void {
    for (let skill of this.skills) {
      this.habilidadesSelecionadas.push(skill);
    }
  }

  adicionarHabilidadesComportamentaisSelecionadas(): void {
    const habilidadesSelect = this.firstFormGroup.value.habilidadesSelect;
    if (habilidadesSelect) {
        for (let habilidade of habilidadesSelect) {
            this.habilidadesSelecionadas.push(habilidade);
        }
    }
}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our skill
    if (value) {
      const newSkill: HabilidadeRequest = {
        nome: value,
        tipo: HabilidadeTipo.TECNICA
      };
      this.skills.push(newSkill);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: HabilidadeRequest): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);

      this.announcer.announce(`Removed ${skill}`);
    }
  }

  edit(skill: HabilidadeRequest, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove skill if it no longer has a name
    if (!value) {
      this.remove(skill);
      return;
    }

    // Edit existing skill
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills[index].nome = value;
    }
  }
}
