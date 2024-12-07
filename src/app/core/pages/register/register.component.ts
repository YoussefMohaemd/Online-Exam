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
import { AuthApiService } from 'auth-api';
import { Router, RouterLink } from '@angular/router';
import { error } from 'node:console';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  showPassword: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{4,25}$/),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6), // على الأقل 8 حروف
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        ), // حروف وأرقام
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    },
    { validators: this.checkRepasswwordMatch }
  );

  constructor(
    private _AuthApiService: AuthApiService,
    private _Router: Router
  ) {}

  Register() {
    if (this.registerForm.valid) {
      this._AuthApiService.Regester(this.registerForm.value).subscribe({
        next: (res) => {
          this._Router.navigate(['/welcome/login']);
        },
      });
    }
  }
  // }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkRepasswwordMatch(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      g.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }
}
