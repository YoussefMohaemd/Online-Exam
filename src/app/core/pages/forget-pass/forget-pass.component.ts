import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthApiService } from 'auth-api';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CheckboxModule
  ],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss',
})
export class ForgetPassComponent {
  showPassword: boolean = false;
  Forget_passForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private _AuthApiService: AuthApiService,
    private _Router: Router
  ) {}

  Forget_pass() {
    if (this.Forget_passForm.valid) {
      this._AuthApiService
        .Forgetpass(this.Forget_passForm.value)
        .subscribe((res) => {
          this._Router.navigate(['/welcome/verify_code']);
        });
    }
  }
}
