import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProductoComponent } from './one-producto.component';

describe('OneProductoComponent', () => {
  let component: OneProductoComponent;
  let fixture: ComponentFixture<OneProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
