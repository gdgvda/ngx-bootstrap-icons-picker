import {ComponentFixture,TestBed} from '@angular/core/testing';
import {NgxBootstrapIconsPickerComponent} from './lib.component';

describe('NgxBootstrapIconsPickerComponent',() => {
  let component: NgxBootstrapIconsPickerComponent;
  let fixture: ComponentFixture<NgxBootstrapIconsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NgxBootstrapIconsPickerComponent
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
