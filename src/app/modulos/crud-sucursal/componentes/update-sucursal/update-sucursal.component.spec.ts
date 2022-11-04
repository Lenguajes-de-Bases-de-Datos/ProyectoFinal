import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSucursalComponent } from './update-sucursal.component';

describe('UpdateSucursalComponent', () => {
  let component: UpdateSucursalComponent;
  let fixture: ComponentFixture<UpdateSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSucursalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
