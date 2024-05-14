import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { NgForOf } from '@angular/common';
import { SkillsService } from 'src/app/services/skills/skills.service';
import { HabilidadeRequest } from 'src/app/models/HabilidadeRequest';
import { HabilidadeTipo } from 'src/app/models/HabilidadeTipo';


@Component({
  selector: 'app-chips-technical-skill',
  templateUrl: './chips-technical-skill.component.html',
  styleUrls: ['./chips-technical-skill.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule,NgForOf],
})
export class ChipsTechnicalSkillComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: HabilidadeRequest[] = [{nome: 'Lógica', tipo: HabilidadeTipo.TECNICA}, {nome: 'Testes Unitários', tipo: HabilidadeTipo.TECNICA}];

  announcer = inject(LiveAnnouncer);

  constructor(private skillsService: SkillsService){
    this.skills.forEach(skill => this.skillsService.addSkill(skill));
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
      this.skillsService.addSkill(newSkill);
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
