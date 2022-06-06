import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCheckBoxComponent } from './status-check-box.component';

describe('StatusCheckBoxComponent', () => {
  let component: StatusCheckBoxComponent;
  let fixture: ComponentFixture<StatusCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCheckBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
