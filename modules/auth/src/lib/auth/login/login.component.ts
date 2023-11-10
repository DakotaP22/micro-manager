import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authSvc = inject(AuthService);

  loginForm = inject(FormBuilder).group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  onLoginClick() {
    const { email, password, rememberMe } = this.loginForm.value;
    console.table({ email, password, rememberMe })
    if (!email || !password) {
      // emit error
      return;
    }

    if (rememberMe) {
      // login and persist
      this.authSvc.loginAndPersist(email, password);
    } else {
      // login without persisting
      this.authSvc.login(email, password);
    }
  }

}
