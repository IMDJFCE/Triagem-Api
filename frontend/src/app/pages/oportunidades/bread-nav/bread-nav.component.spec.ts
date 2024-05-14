import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadNavComponent } from './bread-nav.component';

describe('BreadNavComponent', () => {
  let component: BreadNavComponent;
  let fixture: ComponentFixture<BreadNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadNavComponent]
    });
    fixture = TestBed.createComponent(BreadNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
