import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadVentaComponent } from './read-venta.component';

describe('ReadVentaComponent', () => {
  let component: ReadVentaComponent;
  let fixture: ComponentFixture<ReadVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
