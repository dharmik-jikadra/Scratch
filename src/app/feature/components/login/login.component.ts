import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { emailPattern } from '../../../shared/constants/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  public loginForm!: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(emailPattern)]],
      password: [null, Validators.required],
    });
  }

  public get fControl() {
    return this.loginForm.controls;
  }
  
  public login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.auth.setAutheticateUser({
      token: 'MYtOKEN',
      detail: 'Detail',
    });
    this.router.navigate(['dashboard']);
  }
}
