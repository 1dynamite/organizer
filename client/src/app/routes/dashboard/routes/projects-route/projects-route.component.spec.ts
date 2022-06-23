import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsRouteComponent } from './projects-route.component';

describe('ProjectsRouteComponent', () => {
  let component: ProjectsRouteComponent;
  let fixture: ComponentFixture<ProjectsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
