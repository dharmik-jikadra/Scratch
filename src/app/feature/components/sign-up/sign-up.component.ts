import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { emailPattern } from '../../../shared/constants/constants';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  public signUpForm: FormGroup;

  constructor() {
    this.signUpForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(emailPattern)]],
      password: [null, [Validators.required, this.confirmPasswordValidator]],
      confirmPassword: [
        null,
        Validators.required,
        this.confirmPasswordValidator(),
      ],
    });

    this.signUpForm.get('password')?.valueChanges.subscribe(() => {
      this.signUpForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  public get fControl() {
    return this.signUpForm.controls;
  }

  private confirmPasswordValidator() {
    return (
      control: FormControl
    ): Observable<{ [key: string]: any } | null> => {
      const passwordControl = this.signUpForm.get('password');
      if (!passwordControl) return of(null);
      if (passwordControl.value !== control.value) {
        return of({ confirmPasswordError: 'Passwords do not match' });
      }
      return of(null);
    };
  }

  public signUp(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
  }
}
