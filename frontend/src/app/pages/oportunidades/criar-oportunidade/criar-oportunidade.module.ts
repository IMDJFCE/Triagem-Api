import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarOportunidadeComponent } from './criar-oportunidade.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StepperComponent } from './stepper/stepper.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChipsBehavorialSkillComponent } from "../../components/chips-behavorial-skill/chips-behavorial-skill.component";
import { ChipsTechnicalSkillComponent } from "../../components/chips-technical-skill/chips-technical-skill.component";

@NgModule({
    declarations: [
        CriarOportunidadeComponent,
        StepperComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        MatButtonModule,
        MatStepperModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatAutocompleteModule,
        ChipsBehavorialSkillComponent,
        ChipsTechnicalSkillComponent
    ]
})
export class CriarOportunidadeModule { }
