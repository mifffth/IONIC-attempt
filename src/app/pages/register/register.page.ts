import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder} from "@angular/forms";
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { show, hide } from 'src/store/loading/loading.actions';
import { ToastController } from '@ionic/angular';
import { login } from 'src/store/login/login.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  registerForm!: RegisterPageForm;
  registerStateSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.createForm();

    this.watchRegisterState();
  }

  ngOnDestroy(){
    this.registerStateSubscription.unsubscribe();
  }

  register() {
    this.registerForm.getForm().markAllAsTouched();
    if (this.registerForm.getForm().valid) {
      this.store.dispatch(register({userRegister: this.registerForm.getForm().value}));
    }
    
  }

  private createForm(){
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState(){

    this.registerStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);

      this.onRegistered(state);

      this.onError(state);
    })
  }

  private onRegistered(state: RegisterState) {
    if (state.isRegistered) {
      this.store.dispatch(login({
        email: this.registerForm.getForm().value.email,
        password: this.registerForm.getForm().value.password
      }))
    }
  }
  private onError(state: RegisterState) {
    if (state.error){
      console.log('Error:', state.error.message); // Debugging line
      this.toastController.create({
        message: state.error.message,
        duration: 5000,
        header: 'Registration invalid'
      }).then(toast => {
        console.log('Presenting toast'); // Debugging line
        toast.present();
      }).catch(err => console.log('Toast error:', err)); // Catch any error
    }
  }  

  private toggleLoading(state: RegisterState){
    if (state.isRegistering) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }
}