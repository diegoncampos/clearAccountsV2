import { TestBed } from '@angular/core/testing';

import { FcmNotificationService } from './fcm-notification.service';

describe('FcmNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FcmNotificationService = TestBed.get(FcmNotificationService);
    expect(service).toBeTruthy();
  });
});
