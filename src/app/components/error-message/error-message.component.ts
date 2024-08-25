import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() message: string = ''; // Provide a default value
  @Input() field: AbstractControl | null = null; // Accept any AbstractControl, including FormGroup or FormControl
  @Input() error: string = ''; // Specify the type of error to check

  constructor() {}

  ngOnInit() {}

  shouldShowComponent(): boolean {
    if (this.field) {
      // Check if the field is touched and if the specific error is present
      return (
        this.field.touched && this.field.errors?.[this.error] !== undefined
      );
    }
    return false;
  }
}
