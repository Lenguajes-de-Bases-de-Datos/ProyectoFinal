import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSucursalComponent } from './read-sucursal.component';

describe('ReadSucursalComponent', () => {
  let component: ReadSucursalComponent;
  let fixture: ComponentFixture<ReadSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSucursalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
