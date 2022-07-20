import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AfterConfirmComponent } from './after-confirm.component';
import { ActivatedRoute } from '@angular/router';

describe('AfterConfirmComponent', () => {
  let component: AfterConfirmComponent;
  let fixture: ComponentFixture<AfterConfirmComponent>;
  let httpController: HttpTestingController;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfterConfirmComponent],
      imports: [HttpClientTestingModule],
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

    httpController = TestBed.inject(HttpTestingController);
    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(route.snapshot.paramMap.get).toHaveBeenCalledTimes(2);

    const request = httpController.expectOne({
      method: 'GET',
    });

    request.flush(null);

    expect(component.status).toBe(true);
  });

  it('should http error', () => {
    expect(component).toBeTruthy();

    expect(route.snapshot.paramMap.get).toHaveBeenCalledTimes(2);

    const request = httpController.expectOne({
      method: 'GET',
    });

    request.flush('error', { status: 404, statusText: 'Not Found' });

    expect(component.status).toBe(false);
  });
});
