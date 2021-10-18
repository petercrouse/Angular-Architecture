import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMaintenanceShellComponent } from './user-maintenance-shell.component';

describe('UserMaintenanceShellComponent', () => {
  let component: UserMaintenanceShellComponent;
  let fixture: ComponentFixture<UserMaintenanceShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMaintenanceShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMaintenanceShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
