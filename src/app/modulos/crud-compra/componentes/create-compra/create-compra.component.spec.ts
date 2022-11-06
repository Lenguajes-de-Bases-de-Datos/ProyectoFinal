import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompraComponent } from './create-compra.component';

describe('CreateCompraComponent', () => {
  let component: CreateCompraComponent;
  let fixture: ComponentFixture<CreateCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
