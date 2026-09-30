import { TestBed } from '@angular/core/testing';

import { NgxBootstrapIconsPickerService } from './lib.service';
import { NgxBootstrapIconsPickerModule } from './lib.module';

describe('NgxBootstrapIconsPickerService', () => {
  let service: NgxBootstrapIconsPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxBootstrapIconsPickerModule]
    });
    service = TestBed.inject(NgxBootstrapIconsPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
