import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitenteComponent } from './emitente.component';

describe('EmitenteComponent', () => {
  let component: EmitenteComponent;
  let fixture: ComponentFixture<EmitenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmitenteComponent]
    });
    fixture = TestBed.createComponent(EmitenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
