import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesOportunidadeComponent } from './detalhes-oportunidade.component';

describe('DetalhesOportunidadeComponent', () => {
  let component: DetalhesOportunidadeComponent;
  let fixture: ComponentFixture<DetalhesOportunidadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesOportunidadeComponent]
    });
    fixture = TestBed.createComponent(DetalhesOportunidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
