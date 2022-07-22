import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ProjectItemRouteComponent } from './project-item-route.component';

describe('ProjectItemRouteComponent', () => {
  let component: ProjectItemRouteComponent;
  let fixture: ComponentFixture<ProjectItemRouteComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectItemRouteComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine
                  .createSpy('get')
                  .and.callFake((param: string) => param),
              },
            },
          },
        },
      ],
    }).compileComponents();

    route = TestBed.inject(ActivatedRoute);
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
