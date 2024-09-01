import { loginReducer } from './login.reducers';
import {
  recoverPassword,
  recoverPasswordSuccess,
  recoverPasswordFail,
  loginSuccess,
  loginFail,
} from './login.actions';
import { LoginState } from './LoginState';
import { AppInitialState } from '../AppInitialState';
import { login } from './login.actions';
import { User } from 'src/app/model/user/User';
import * as firebase from 'firebase/app';

describe('Login store', () => {
  it('recoverPasswordSuccess', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(
      initialState,
      recoverPassword({ email: 'any@email.com' })
    );
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    });
  });

  it('recoverPasswordFail', () => {
    const initialState: LoginState = AppInitialState.login;
    const error = 'error';
    const newState = loginReducer(initialState, recoverPasswordFail({ error }));
    expect(newState).toEqual({
      ...initialState,
      error: 'error',
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    });
  });
  it('login'),
    () => {
      const initialState: LoginState = AppInitialState.login;
      // const user = 'user';
      const newState = loginReducer(
        initialState,
        login({ email: 'valid@email.com', password: 'anyPassword' })
      );
      expect(newState).toEqual({
        ...initialState,
        error: null,
        isLoggedIn: false,
        isLoggingIn: true,
      });
    };

  it('loginSuccess'),
    () => {
      const initialState: LoginState = (AppInitialState.login = {
        ...AppInitialState.login,
        isLoggingIn: true,
      });

      const user = new User();
      user.id = 'anyId';
      const newState = loginReducer(initialState, loginSuccess({ user }));
      expect(newState).toEqual({
        ...initialState,

        isLoggedIn: true,
        isLoggingIn: false,
      });

      it('loginFail'),
        () => {
          const initialState: LoginState = (AppInitialState.login = {
            ...AppInitialState.login,
            isLoggingIn: true,
          });
          const error = { error: 'error' };
          const newState = loginReducer(initialState, loginFail({ error }));
          expect(newState).toEqual({
            ...initialState,
            error: 'error',
            isLoggedIn: false,
            isLoggingIn: false,
          });
        };
    };
});
