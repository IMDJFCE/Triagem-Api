import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { ChipsBehavorialSkillComponent } from '../../components/chips-behavorial-skill/chips-behavorial-skill.component';
import { ChipsTechnicalSkillComponent } from '../../components/chips-technical-skill/chips-technical-skill.component';
import { SkillsService } from 'src/app/services/skills/skills.service';
import { UsuarioRequest } from 'src/app/models/UsuarioRequest';
import { GeneroDescricao } from 'src/app/models/GeneroDescricao';
import { RacaDescricao } from 'src/app/models/RacaDescricao';
import { DeficienciaRequest } from 'src/app/models/DeficienciaRequest';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Genero } from 'src/app/models/Genero';
import { Raca } from 'src/app/models/Raca';
import {Router} from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    ChipsBehavorialSkillComponent,
    ChipsTechnicalSkillComponent,
  ],
})
export class ContentComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
  });

  secondFormGroup = this._formBuilder.group({
  });
  
  thirdFormGroup = this._formBuilder.group({
  selectControlGenero: this._formBuilder.control(GeneroDescricao.MASCULINO, [Validators.required]),
  selectControlEtnia: this._formBuilder.control(RacaDescricao.PARDO, [Validators.required]),
  selectControlDeficiencia: this._formBuilder.control('', [Validators.required]),
  textControl: this._formBuilder.control('', [Validators.required])
  });

  racaDescricao = RacaDescricao;
  generoDescricao = GeneroDescricao;

  constructor(private _formBuilder: FormBuilder, _commonModule: CommonModule, private skillsService: SkillsService, private usuarioService: UsuarioService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.skillsService.clearSkills();
  }

  finalizar(){
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
      habilidades: [],
      deficiencias: deficiencias
    }

    this.skillsService.skills$.subscribe(skills => {
      usuarioRequest.habilidades = skills;
    });

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
}
