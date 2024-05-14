import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsTechnicalSkillComponent } from './chips-technical-skill.component';

describe('ChipsTechnicalSkillComponent', () => {
  let component: ChipsTechnicalSkillComponent;
  let fixture: ComponentFixture<ChipsTechnicalSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsTechnicalSkillComponent]
    });
    fixture = TestBed.createComponent(ChipsTechnicalSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
