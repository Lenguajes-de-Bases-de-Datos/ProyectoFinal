import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCompraComponent } from './read-compra.component';

describe('ReadCompraComponent', () => {
  let component: ReadCompraComponent;
  let fixture: ComponentFixture<ReadCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
