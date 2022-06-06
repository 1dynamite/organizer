import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsInProgressComponent } from './controls-in-progress.component';

describe('ControlsInProgressComponent', () => {
  let component: ControlsInProgressComponent;
  let fixture: ComponentFixture<ControlsInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlsInProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
