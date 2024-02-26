import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePropostasComponent } from './lista-de-propostas.component';

describe('ListaDePropostasComponent', () => {
  let component: ListaDePropostasComponent;
  let fixture: ComponentFixture<ListaDePropostasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDePropostasComponent]
    });
    fixture = TestBed.createComponent(ListaDePropostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
