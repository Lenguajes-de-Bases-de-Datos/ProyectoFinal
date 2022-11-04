import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUbicacionComponent } from './update-ubicacion.component';

describe('UpdateUbicacionComponent', () => {
  let component: UpdateUbicacionComponent;
  let fixture: ComponentFixture<UpdateUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUbicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
