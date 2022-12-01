import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVentasComponent } from './grafica-ventas.component';

describe('GraficaVentasComponent', () => {
  let component: GraficaVentasComponent;
  let fixture: ComponentFixture<GraficaVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
