import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { OportunidadeService } from 'src/app/services/oportunidade/oportunidade.service';
import { OportunidadeRequest } from 'src/app/models/OportunidadeRequest';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HabilidadeRequest } from 'src/app/models/HabilidadeRequest';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { HabilidadeTipo } from 'src/app/models/HabilidadeTipo';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})

export class StepperComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: HabilidadeRequest[] = [{nome: 'Lógica', tipo: HabilidadeTipo.TECNICA}, {nome: 'Testes Unitários', tipo: HabilidadeTipo.TECNICA}];
  habilidadesSelecionadas: HabilidadeRequest[] = [];

  announcer = inject(LiveAnnouncer);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    startDateControl: ['', Validators.required],
    endDateControl: ['', Validators.required],
    textControl: ['', Validators.required],
    emailControl: ['', Validators.required]
  });

  secondFormGroup = this._formBuilder.group({
  });
 thirdFormGroup = this._formBuilder.group({
  });

  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private oportunidadeService: OportunidadeService, private router: Router){}

  finalizar(){
    const firstFormGroupValues = this.firstFormGroup.value;
    this.adicionarHabilidadesTecnicasSelecionadas();

    const oportunidadeRequest: OportunidadeRequest = {
      titulo: firstFormGroupValues.firstCtrl ?? '',
      dataInicial: this.parseDate(firstFormGroupValues.startDateControl),
      dataFinal: this.parseDate(firstFormGroupValues.endDateControl),
      descricao: firstFormGroupValues.textControl ?? '',
      habilidades: this.habilidadesSelecionadas,
      email: firstFormGroupValues.emailControl ?? ''
    }
    
    this.oportunidadeService.createOportunidade(oportunidadeRequest).subscribe({
      next: (response) => {
        alert('Oportunidade criada com sucesso"');
        console.log(response);
        this.router.navigate(['/pages/oportunidades']);
      },
      error: (error) => {
        alert('Erro ao criar oportunidade:\n' + JSON.stringify(error, null, 2));
        console.log(error);
      }
    });
  }

  parseDate(value: string | Date | null | undefined):Date {
    if (value instanceof Date) {
      return value; 
    } else if (typeof value === 'string') {
      return new Date(value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2'));
    } else {
      return new Date(); 
    }
  }

  adicionarHabilidadesTecnicasSelecionadas(): void {
    for (let skill of this.skills) {
      this.habilidadesSelecionadas.push(skill);
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