import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadProductoComponent } from './read-producto.component';

describe('ReadProductoComponent', () => {
  let component: ReadProductoComponent;
  let fixture: ComponentFixture<ReadProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
