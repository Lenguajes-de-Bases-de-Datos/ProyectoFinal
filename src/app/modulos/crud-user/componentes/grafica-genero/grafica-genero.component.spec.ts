import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaGeneroComponent } from './grafica-genero.component';

describe('GraficaGeneroComponent', () => {
  let component: GraficaGeneroComponent;
  let fixture: ComponentFixture<GraficaGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
