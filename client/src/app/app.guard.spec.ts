import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AppGuard } from './app.guard';

describe('AppGuard', () => {
  let guard: AppGuard;
  let routeSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const useValueRouterSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: useValueRouterSpy }],
    });
    guard = TestBed.inject(AppGuard);
    routeSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should guard', () => {
    routeSpy.createUrlTree.and.returnValue(false as any);
    const localStorageGetItemspy = spyOn(localStorage, 'getItem');

    localStorageGetItemspy.and.returnValue('someValue');

    let valid = guard.canActivate(null as any, null as any);

    expect(valid).toBe(true);

    localStorageGetItemspy.and.returnValue(null);
    valid = guard.canActivate(null as any, null as any);
    expect(valid).toBe(false);
    expect(routeSpy.createUrlTree).toHaveBeenCalledOnceWith(['sign-in']);
  });
});
