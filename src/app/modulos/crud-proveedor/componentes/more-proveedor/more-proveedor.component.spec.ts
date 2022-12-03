import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreProveedorComponent } from './more-proveedor.component';

describe('MoreProveedorComponent', () => {
  let component: MoreProveedorComponent;
  let fixture: ComponentFixture<MoreProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
