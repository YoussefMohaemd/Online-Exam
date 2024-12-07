import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from 'auth-api';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showPassword: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6), // على الأقل 8 حروف
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ), // حروف وأرقام
    ]),
  });

  constructor(
    private _AuthApiService: AuthApiService,
    private _Router: Router
  ) {}

  Login() {
    if (this.loginForm.valid) {
      this._AuthApiService.Login(this.loginForm.value).subscribe({
        next: (res) => {
          this._Router.navigate(['/welcome/register']);
        },
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
