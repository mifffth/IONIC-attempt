import { TestBed } from '@angular/core/testing';
import { loginReducer } from 'src/store/login/login.reducers';
import { AuthGuard } from './auth-guard';
import { StoreModule } from '@ngrx/store';
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import { loginSuccess } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';
import { Router, RouterModule } from '@angular/router';

describe('AuthGuardService', () => {
  let guard: AuthGuard;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer),
      ],
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  it('should allow logged user to access page', () => {
    store.dispatch(loginSuccess({ user: new User() }));
    guard.canLoad().subscribe((isAllowed) => {
      expect(isAllowed).toBeTruthy;
    });
  });

  it('should not allow not logged user to access page', () => {
    guard.canLoad().subscribe((isAllowed) => {
      //subs ke allowed dan expektasi allowed buat falsy/tergantung
      expect(isAllowed).toBeFalsy;
    });

    it('should not allowed user be sent to login page', () => {
      spyOn(router, 'navigateByUrl');

      guard.canLoad().subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('login');
      });
    });
  });
});
