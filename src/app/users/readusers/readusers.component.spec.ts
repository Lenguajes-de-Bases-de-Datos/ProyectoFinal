import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadusersComponent } from './readusers.component';

describe('ReadusersComponent', () => {
  let component: ReadusersComponent;
  let fixture: ComponentFixture<ReadusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
