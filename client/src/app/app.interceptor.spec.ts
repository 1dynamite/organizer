import { TestBed } from '@angular/core/testing';

import { AppInterceptor } from './app.interceptor';

describe('AppInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AppInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AppInterceptor = TestBed.inject(AppInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should intercept', () => {
    const interceptor: AppInterceptor = TestBed.inject(AppInterceptor);
    const spy = spyOn(localStorage, 'getItem');

    spy.and.returnValue('someValue');

    const request = {
      clone: jasmine.createSpy('clone').and.returnValue('cloneReturnValue'),
    };
    const next = { handle: jasmine.createSpy('handle') };

    interceptor.intercept(request as any, next as any);

    expect(request.clone).toHaveBeenCalledOnceWith({
      setHeaders: { Authorization: 'someValue' },
    });
    expect(next.handle).toHaveBeenCalledOnceWith('cloneReturnValue');

    spy.and.returnValue(null);
    interceptor.intercept(request as any, next as any);
    expect(next.handle).toHaveBeenCalledWith(request);
  });
});
