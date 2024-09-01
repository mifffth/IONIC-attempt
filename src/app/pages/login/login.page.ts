import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, recoverPassword, recoverPasswordFail, recoverPasswordSuccess, loginSuccess, loginFail } from 'src/store/login/login.actions';
import { Subscription } from 'rxjs';
import { LoginState } from 'src/store/login/LoginState';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  loginStateSubscription?: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onError(loginState);
      this.toggleLoading(loginState);
      this.onIsLoggingIn(loginState);
      this.onIsRecoveringPassword(loginState);
      this.onIsLoggedIn(loginState);
    });
  }

  ngOnDestroy() {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
    this.store.dispatch(hide());
  }

  private toggleLoading(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  private onIsLoggingIn(loginState: LoginState) {
    if (loginState.isLoggingIn) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email, password).subscribe(user => {
        this.store.dispatch(loginSuccess({ user }));
      }, error => {
        this.store.dispatch(loginFail({ error }));
      });
    }
  }

  private onIsRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      if (this.form.get('email')) {
        this.authService.recoverEmailPassword(this.form.get('email')?.value).subscribe(() => {
          this.store.dispatch(recoverPasswordSuccess());
        }, error => {
          this.store.dispatch(recoverPasswordFail({ error }));
        });
      }
    }
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const errorMessage = typeof loginState.error === 'string' ? loginState.error : "User not found";
      const toaster = await this.toastController.create({
        position: "bottom",
        message: errorMessage,
        color: "danger",
      });
      toaster.present();
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword && !loginState.error) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Email sent',
        color: 'success',
      });
      toaster.present();
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword({email: this.form.get('email')?.value}));
  }

  login() {
    this.store.dispatch(login({email: this.form.get('email')?.value, password: this.form.get('email')?.value}));
  }

  register() {
    this.router.navigate(['register']);
  }
}
