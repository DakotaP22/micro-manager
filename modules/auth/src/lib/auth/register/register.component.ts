import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ErrorNotificationService } from '@micro-manager/error-notification';
import { RegisterService } from './register.service';

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerSvc = inject(RegisterService);
  errorNotificationSvc = inject(ErrorNotificationService);
  router = inject(Router);

  registerForm = inject(FormBuilder).group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required, this.matchesPassword()]],
    accessCode: ['', Validators.required]
  });

  matcher = new MyErrorStateMatcher();

  private matchesPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.registerForm?.get('password')?.value ?? '';
      return control.value === password ? null : { Mismatch: true };
    };
  }

  async onRegisterClick() {
    const { email, password, confirmPassword, accessCode } = this.registerForm.value;
    if (!email || !password || !confirmPassword || !accessCode) {
      this.errorNotificationSvc.notifyUser('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      this.errorNotificationSvc.notifyUser('Passwords do not match');
    }

    try {
      await this.registerSvc.registerUser(
        email,
        password,
        accessCode
      );
      this.router.navigate(['/buckets']);
    } catch (e) {
      this.errorNotificationSvc.notifyUser(e as string);
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
