import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockIconComponent } from './clock-icon.component';

describe('ClockIconComponent', () => {
  let component: ClockIconComponent;
  let fixture: ComponentFixture<ClockIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
