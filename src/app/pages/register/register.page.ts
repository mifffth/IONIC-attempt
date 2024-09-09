import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder } from "@angular/forms";
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { show, hide } from 'src/store/loading/loading.actions';
import { ToastController } from '@ionic/angular';
import { login } from 'src/store/login/login.actions';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  registerForm!: RegisterPageForm;
  registerStateSubscription!: Subscription;
  loginStateSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.watchRegisterState();
  }

  ngOnDestroy(){
    this.registerStateSubscription.unsubscribe();
    this.loginStateSubscription?.unsubscribe();
  }

  register() {
    this.registerForm.getForm().markAllAsTouched();
    if (this.registerForm.getForm().valid) {
      this.store.dispatch(register({ userRegister: this.registerForm.getForm().value }));
    }
  }

  private createForm(){
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState() {
    this.registerStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);

      if (state.isRegistered) {
        this.handleLoginAfterRegistration();
      } else if (state.error) {
        this.displayToast(state.error);
      }
    });
  }

  private handleLoginAfterRegistration() {
    this.store.dispatch(login({
      email: this.registerForm.getForm().value.email,
      password: this.registerForm.getForm().value.password
    }));

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      if (loginState.isLoggedIn) {
        this.router.navigate(['/home']);
      } else if (loginState.error) {
        this.displayToast(loginState.error);
      }
    });
  }

  private displayToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 3000,
      header: 'Error'
    }).then(toast => toast.present());
  }

  private toggleLoading(state: RegisterState){
    if (state.isRegistering) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }
}
