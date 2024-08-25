import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from './error-message.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initialize the component properly
  }));

  it('should show error message for required error', () => {
    const control = new FormControl();
    control.markAsTouched();
    control.setErrors({ required: true });
    component.field = control;
    component.error = 'required';

    expect(component.shouldShowComponent()).toBeTruthy();
  });

  it('should show error message for invalid email error', () => {
    const control = new FormControl();
    control.markAsTouched();
    control.setErrors({ email: true });
    component.field = control;
    component.error = 'email';

    expect(component.shouldShowComponent()).toBeTruthy();
  });

  it('should hide error message for non-touched field', () => {
    const control = new FormControl();
    control.setErrors({ required: true });
    component.field = control;
    component.error = 'required';

    expect(component.shouldShowComponent()).toBeFalsy();
  });

  it('should hide error message for touched field without specific error', () => {
    const control = new FormControl();
    control.markAsTouched();
    component.field = control;
    component.error = 'required';

    expect(component.shouldShowComponent()).toBeFalsy();
  });

  it('should hide error message for touched field with different error', () => {
    const control = new FormControl();
    control.markAsTouched();
    control.setErrors({ email: true });
    component.field = control;
    component.error = 'required';

    expect(component.shouldShowComponent()).toBeFalsy();
  });
});
