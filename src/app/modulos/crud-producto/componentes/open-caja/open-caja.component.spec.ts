import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCajaComponent } from './open-caja.component';

describe('OpenCajaComponent', () => {
  let component: OpenCajaComponent;
  let fixture: ComponentFixture<OpenCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
