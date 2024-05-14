import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroComponent]
    });
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    component.form.controls['matricula'].setValue('');

    expect(component.form.valid).toBeFalse();
  });
});
