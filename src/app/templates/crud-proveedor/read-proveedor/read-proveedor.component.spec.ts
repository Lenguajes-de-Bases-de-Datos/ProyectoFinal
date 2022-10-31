import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadProveedorComponent } from './read-proveedor.component';

describe('ReadProveedorComponent', () => {
  let component: ReadProveedorComponent;
  let fixture: ComponentFixture<ReadProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
