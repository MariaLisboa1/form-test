import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-form-with-events',
  templateUrl: './form-with-events.component.html',
  styleUrls: ['./form-with-events.component.scss']
})
export class FormWithEventsComponent implements OnInit {
  myForm: FormGroup;
  sku: AbstractControl;

  constructor(private fb: FormBuilder) { 

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      'sku':  ['', Validators.required]
    });

    this.sku = this.myForm.controls['sku'];

    this.sku.valueChanges.subscribe(
      (value: string) => {
        console.log('sku changed to:', value);
      }
    );

    this.myForm.valueChanges.subscribe(
      (form: any) => {
        console.log('form changed to:', form);
      }
    );
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form.sku);
  }
}
