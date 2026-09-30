import {ComponentFixture,TestBed} from '@angular/core/testing';
import {NgxBootstrapIconsPickerComponent} from './lib.component';
import {NgxBootstrapIconsPickerModule} from './lib.module';

describe('NgxBootstrapIconsPickerComponent',() => {
  let component: NgxBootstrapIconsPickerComponent;
  let fixture: ComponentFixture<NgxBootstrapIconsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxBootstrapIconsPickerModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NgxBootstrapIconsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',() => {
    expect(component).toBeTruthy();
  });

});
