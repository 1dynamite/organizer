import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsCompletedComponent } from './controls-completed.component';

describe('ControlsCompletedComponent', () => {
  let component: ControlsCompletedComponent;
  let fixture: ComponentFixture<ControlsCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlsCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
