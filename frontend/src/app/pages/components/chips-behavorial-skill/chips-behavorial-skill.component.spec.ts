import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsBehavorialSkillComponent } from './chips-behavorial-skill.component';

describe('ChipsBehavorialSkillComponent', () => {
  let component: ChipsBehavorialSkillComponent;
  let fixture: ComponentFixture<ChipsBehavorialSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsBehavorialSkillComponent]
    });
    fixture = TestBed.createComponent(ChipsBehavorialSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
