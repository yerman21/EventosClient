import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsistentesComponent } from './lista-asistentes.component';

describe('ListaAsistentesComponent', () => {
  let component: ListaAsistentesComponent;
  let fixture: ComponentFixture<ListaAsistentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAsistentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAsistentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
