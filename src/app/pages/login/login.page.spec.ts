import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import {
  recoverPassword,
  recoverPasswordSuccess,
  recoverPasswordFail,
} from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/model/user/User';
import { Observable, of, throwError } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { login, loginFail, loginSuccess } from 'src/store/login/login.actions';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>;
  let toastController: ToastController;
  // let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router); // Updated to use inject
    store = TestBed.inject(Store); // Updated to use inject
    toastController = TestBed.inject(ToastController);
    // authService = TestBed.inject(AuthService);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create form on Init', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined(); // Check that form is initialized
  });

  it('should go to register', () => {
    spyOn(router, 'navigate'); // Spy on the navigate method
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot', () => {

    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    page.querySelector('#recoverPasswordButton').click();

    store.select('login').subscribe((loginState) => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    });
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeTruthy();
    });
  });

  

  it('should not show loading when not recovering password', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@email.com"})); // Corrected method call
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeFalsy();
    });
    expect(toastController.create).not.toHaveBeenCalledTimes(1);
  });

  it('should hide loading and show error toast when recovering password', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@email.com"})); // Corrected method call
    store.dispatch(recoverPasswordFail({ error: 'message' })); // Corrected method call
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeFalsy();
    });
    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should show loading when logging in', () => {

    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('password');
    page.querySelector('#loginButton').click();

    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeTruthy();
    })
    store.select('login').subscribe((loginState) => {
      expect(loginState.isLoggingIn).toBeTruthy();
  })

})
    it('should hide loading and send user to home if login is successful', () => {
      spyOn(router, 'navigate');

      fixture.detectChanges();
      store.dispatch(login({ email: 'valid@email.com', password: 'anyPassword' }));
      store.dispatch(loginSuccess({user: new User()}));

      store.select('loading').subscribe((loadingState) => {
        expect(loadingState.show).toBeFalsy();
      })

      store.select('login').subscribe((loginState) => {
        expect(loginState.isLoggedIn).toBeTruthy();
      })

      expect(router.navigate).toHaveBeenCalledWith(['home']);
    })

    it('should hide loading and show error when user cant login', () => {
      spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));;
      fixture.detectChanges();

      store.dispatch(login({ email: 'valid@email.com', password: 'anyPassword' }));
      store.dispatch(loginFail({ error: {message:'err0r'}}));
      
      store.select('loading').subscribe((loadingState) => {
        expect(loadingState.show).toBeFalsy();
      })

      expect(toastController.create).toHaveBeenCalledTimes(1);
      })

    });
