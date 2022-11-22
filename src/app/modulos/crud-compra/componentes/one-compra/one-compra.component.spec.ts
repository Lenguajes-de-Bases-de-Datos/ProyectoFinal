import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCompraComponent } from './one-compra.component';

describe('OneCompraComponent', () => {
  let component: OneCompraComponent;
  let fixture: ComponentFixture<OneCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
