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
import { Router } from '@angular/router';
@Component({
  selector: 'app-set-pass',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
  ],
  templateUrl: './set-pass.component.html',
  styleUrl: './set-pass.component.scss',
})
export class SetPassComponent {
  showPassword: boolean = false;
  resetpassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
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

  Resetpass() {
    if (this.resetpassForm.valid) {

      this._AuthApiService.resetpass(this.resetpassForm.value).subscribe({
        next: (res) => {
          this._Router.navigate(['/welcome/login']);
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
