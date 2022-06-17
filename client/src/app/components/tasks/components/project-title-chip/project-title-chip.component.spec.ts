import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTitleChipComponent } from './project-title-chip.component';

describe('ProjectTitleChipComponent', () => {
  let component: ProjectTitleChipComponent;
  let fixture: ComponentFixture<ProjectTitleChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTitleChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTitleChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
