import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestViewComponent } from './gest-view.component';

describe('GestViewComponent', () => {
  let component: GestViewComponent;
  let fixture: ComponentFixture<GestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
