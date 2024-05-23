import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authSvc = inject(AuthService);

  user = toSignal(this.authSvc.user$);

  loginForm = inject(FormBuilder).group({
    email: [''],
    password: ['']
  })

  constructor() {
    effect(() => {
      console.log('User:', this.user());
    });
  }


  signIn() {
    const { email, password } = this.loginForm.value;
    if(!!email && !!password) {
      this.authSvc.signIn(email, password);
    }
  }

}
