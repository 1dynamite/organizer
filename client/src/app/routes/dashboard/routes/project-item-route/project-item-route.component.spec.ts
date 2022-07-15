import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemRouteComponent } from './project-item-route.component';

describe('ProjectItemRouteComponent', () => {
  let component: ProjectItemRouteComponent;
  let fixture: ComponentFixture<ProjectItemRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
