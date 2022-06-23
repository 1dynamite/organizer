import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterConfirmComponent } from './after-confirm.component';

describe('AfterConfirmComponent', () => {
  let component: AfterConfirmComponent;
  let fixture: ComponentFixture<AfterConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
