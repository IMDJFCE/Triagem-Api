import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SkillsService } from 'src/app/services/skills/skills.service';
import { OportunidadeService } from 'src/app/services/oportunidade/oportunidade.service';
import { OportunidadeRequest } from 'src/app/models/OportunidadeRequest';
import { Router } from '@angular/router';

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

  constructor(private _formBuilder: FormBuilder, private skillsService: SkillsService, private oportunidadeService: OportunidadeService, private router: Router){}

  finalizar(){
    const firstFormGroupValues = this.firstFormGroup.value;

    const oportunidadeRequest: OportunidadeRequest = {
      titulo: firstFormGroupValues.firstCtrl ?? '',
      dataInicial: this.parseDate(firstFormGroupValues.startDateControl),
      dataFinal: this.parseDate(firstFormGroupValues.endDateControl),
      descricao: firstFormGroupValues.textControl ?? '',
      habilidades: [],
      email: firstFormGroupValues.emailControl ?? ''
    }
    
    this.skillsService.skills$.subscribe(skills => {
      oportunidadeRequest.habilidades = skills;
    });
    
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

  ngOnDestroy() {
    this.skillsService.clearSkills();
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
}