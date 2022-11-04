import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadUbicacionComponent } from './read-ubicacion.component';

describe('ReadUbicacionComponent', () => {
  let component: ReadUbicacionComponent;
  let fixture: ComponentFixture<ReadUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadUbicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
