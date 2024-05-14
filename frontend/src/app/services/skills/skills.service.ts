import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HabilidadeRequest } from 'src/app/models/HabilidadeRequest';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skillsSubject = new BehaviorSubject<HabilidadeRequest[]>([]);
  skills$ = this.skillsSubject.asObservable();

  addSkill(skill: HabilidadeRequest): void {
    const currentSkills = this.skillsSubject.value;
    this.skillsSubject.next([...currentSkills, skill]);
  }

  clearSkills(): void {
    this.skillsSubject.next([]);
  }
}
