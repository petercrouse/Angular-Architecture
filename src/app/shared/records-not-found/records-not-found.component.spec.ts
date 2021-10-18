import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsNotFoundComponent } from './records-not-found.component';

describe('RecordsNotFoundComponent', () => {
  let component: RecordsNotFoundComponent;
  let fixture: ComponentFixture<RecordsNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
