import { TestBed } from '@angular/core/testing';

import { TasksRewrittenService } from './tasks-rewritten.service';

describe('TasksRewrittenService', () => {
  let service: TasksRewrittenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksRewrittenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
