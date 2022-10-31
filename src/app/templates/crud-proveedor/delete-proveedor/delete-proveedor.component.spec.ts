import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProveedorComponent } from './delete-proveedor.component';

describe('DeleteProveedorComponent', () => {
  let component: DeleteProveedorComponent;
  let fixture: ComponentFixture<DeleteProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
