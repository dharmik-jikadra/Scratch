import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafePipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  private fb = inject(FormBuilder);
  formFields: any[] = [
    {
      label: 'First Name',
      control: 'name',
      required: true,
      pattern: /[a-z]/,
    },
    {
      label: 'Study',
      control: 'study',
    },
    {
      label: 'Address',
      control: 'address',
      formGroup: true,
      fields: [
        {
          label: 'Country',
          control: 'country',
          required: true,
        },
        {
          label: 'State',
          control: 'state',
          required: true,
        },
        {
          label: 'City',
          control: 'city',
          required: true,
        },
      ],
    },
    {
      label: 'Address',
      control: 'addressArr',
      formArray: true,
      fields: [
        {
          label: 'Country Arr',
          control: 'country',
          required: true,
        },
        {
          label: 'State Arr',
          control: 'state',
          required: true,
        },
        {
          label: 'City Arr',
          control: 'city',
          required: true,
        },
      ],
    },
  ];
  public myForm!: FormGroup;

  constructor() {
    const group = this.fb.group({});
    this.formFields.forEach((field) => {
      if (field.formArray) {
        const innerarray: any = this.fb.array([]);
        innerarray.push(this.createFormGroup(field));
        group.addControl(field.control, innerarray);
      } else if (field.formGroup) {
        group.addControl(field.control, this.createFormGroup(field));
      } else {
        group.addControl(field.control, this.createControl(field));
      }
    });
    this.myForm = group;
  }

  createControl(field: any): FormControl {
    const newControl = new FormControl(null);
    field.required && newControl.addValidators(Validators.required);
    field.pattern &&
      newControl.addValidators(Validators.pattern(field.pattern));
    return newControl;
  }

  createFormGroup(field: any): FormGroup {
    const innerGroup = this.fb.group({});
    field.fields.forEach((ctrl: any) => {
      innerGroup.addControl(ctrl.control, this.createControl(ctrl));
    });
    return innerGroup;
  }

  public addControl(arrName: string, fields: any) {
    this.getArr(arrName).push(this.createFormGroup(fields));
  }

  public removeControl(arrName: string, index: number) {
    this.getArr(arrName).removeAt(index);
  }

  get fControl() {
    return this.myForm.controls;
  }

  public getArr(field: string) {
    return this.myForm.get(field) as FormArray;
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log('FORM VALUE', this.myForm.value);
  }
}
