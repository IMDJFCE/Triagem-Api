import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarOportunidadeComponent } from './criar-oportunidade.component';

describe('CriarOportunidadeComponent', () => {
  let component: CriarOportunidadeComponent;
  let fixture: ComponentFixture<CriarOportunidadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarOportunidadeComponent]
    });
    fixture = TestBed.createComponent(CriarOportunidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
