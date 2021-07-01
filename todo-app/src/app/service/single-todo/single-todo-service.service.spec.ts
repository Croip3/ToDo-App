import { TestBed } from '@angular/core/testing';

import { SingleTodoServiceService } from './single-todo-service.service';

describe('SingleTodoServiceService', () => {
  let service: SingleTodoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleTodoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
