import { TestBed } from '@angular/core/testing';

import { SocketsWebService } from './sockets-web.service';

describe('SocketsWebService', () => {
  let service: SocketsWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketsWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
