import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUbicacionComponent } from './create-ubicacion.component';

describe('CreateUbicacionComponent', () => {
  let component: CreateUbicacionComponent;
  let fixture: ComponentFixture<CreateUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUbicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
