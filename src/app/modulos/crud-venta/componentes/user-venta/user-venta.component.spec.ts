import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVentaComponent } from './user-venta.component';

describe('UserVentaComponent', () => {
  let component: UserVentaComponent;
  let fixture: ComponentFixture<UserVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
