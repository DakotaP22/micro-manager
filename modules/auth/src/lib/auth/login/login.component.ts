import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { ErrorNotificationService } from '@micro-manager/error-notification';


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
  errorNotificationSvc = inject(ErrorNotificationService);

  loginForm = inject(FormBuilder).group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  async onLoginClick() {
    const { email, password, rememberMe } = this.loginForm.value;
    // console.table({ email, password, rememberMe })
    if (!email || !password) {
      // emit error
      return;
    }

    try {
      if (rememberMe) {
        // login and persist
        await this.authSvc.loginAndPersist(email, password);
      } else {
        // login without persisting
        await this.authSvc.login(email, password);
      }
    } catch (err) {
      this.errorNotificationSvc.notifyUser("Invalid Username/Password")
    }
    
  }

}
