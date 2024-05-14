import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VinculoComponent } from './vinculo.component';

describe('VinculoComponent', () => {
  let component: VinculoComponent;
  let fixture: ComponentFixture<VinculoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [VinculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinculoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should validate the fields', () => {
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');

    expect(component.form.valid).toBeFalse();
  });
});
