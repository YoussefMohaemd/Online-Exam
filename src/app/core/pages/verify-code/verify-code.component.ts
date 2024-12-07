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
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
  ],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent {
  verify_codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _AuthApiService: AuthApiService,
    private _Router: Router
  ) {}

  verify_code() {
    if (this.verify_codeForm.valid) {
      this._AuthApiService.VerifyCode(this.verify_codeForm.value).subscribe({
        next: (res) => {
          this._Router.navigate(['/welcome/setpass']);
        },
      });
    }
  }
  
}
