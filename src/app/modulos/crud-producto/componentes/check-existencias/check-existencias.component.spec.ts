import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckExistenciasComponent } from './check-existencias.component';

describe('CheckExistenciasComponent', () => {
  let component: CheckExistenciasComponent;
  let fixture: ComponentFixture<CheckExistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckExistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
