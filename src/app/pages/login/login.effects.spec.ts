import { Action, StoreModule } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { LoginEffects } from './login.effects';
import {
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
} from 'src/store/login/login.actions';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { recoverPasswordSuccess } from 'src/store/login/login.actions';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth/auth.service';
import { login } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';

describe('LoginEffects', () => {
  let actions$: Observable<Action>;
  let effects: LoginEffects;
  let user = new User();
  let error = { error: 'error' };
  user.id = 'anyUserId';
  let AuthServiceMock = {
    recoverEmailPassword: (email: string) => {
      if (email === 'valid@email.com' || email === 'verified@email.com') {
        return of(true);
      } else {
        return of(false);
      }
    }, 
    login: (email: string, password: string) => {
      if (email == 'error@email.com') {
        return throwError({ error: 'error' });
      }
      return of(user);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([LoginEffects]),
      ],
      providers: [{ provide: AuthService, useValue: AuthServiceMock }],
    });

    effects = TestBed.inject(LoginEffects);
  });

  it('should recover password with existing email return success', (done) => {
    actions$ = of(recoverPassword({ email: 'any@email.com' }));

    effects.recoverPassword$.subscribe((newAction) => {
      expect(newAction).toEqual(recoverPasswordSuccess());
      done();
    });
  });

  it('should recover password with not existing email return fail', (done) => {
    actions$ = of(recoverPassword({ email: 'error@email.com' }));

    effects.recoverPassword$.subscribe((newAction) => {
      expect(newAction).toEqual(recoverPasswordFail({ error }));
      done();
    });
  });

  it('should login with valid credentials return success', (done) => {
    actions$ = of(login({ email: 'valid@email.com', password: 'anyPassword' }));

    effects.login$.subscribe((newAction) => {
      expect(newAction).toEqual(loginSuccess({ user }));
      done();
    });
  });

  it('should login with invalid credentials return fail', (done) => {
    actions$ = of(login({ email: 'error@email.com', password: 'anyPassword' }));

    effects.login$.subscribe((newAction) => {
      expect(newAction).toEqual(loginFail({ error }));
      done();
    });
  });
});
