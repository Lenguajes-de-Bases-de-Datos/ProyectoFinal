import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneVentaComponent } from './one-venta.component';

describe('OneVentaComponent', () => {
  let component: OneVentaComponent;
  let fixture: ComponentFixture<OneVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
