import { TestBed } from '@angular/core/testing';

import { NgxBootstrapIconsPickerService } from './ngx-bootstrap-icons-picker.service';

describe('NgxBootstrapIconsPickerService', () => {
  let service: NgxBootstrapIconsPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBootstrapIconsPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
