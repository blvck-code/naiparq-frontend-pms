import { TestBed } from '@angular/core/testing';

import { BloggerGuard } from './blogger.guard';

describe('BloggerGuard', () => {
  let guard: BloggerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BloggerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
