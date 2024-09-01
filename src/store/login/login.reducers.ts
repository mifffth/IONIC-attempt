import { createReducer, on } from '@ngrx/store';
import { LoginState } from './LoginState';
import {
  recoverPasswordFail,
  recoverPasswordSuccess,
  recoverPassword,
  loginSuccess,
} from './login.actions';
import { AppInitialState } from '../AppInitialState';
import { login } from './login.actions';
import { loginFail } from './login.actions';


const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(
  initialState,
  on(recoverPassword, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),

  on(recoverPasswordSuccess, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),

  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),

  on(login, currentState => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true
    }
  }),

  on(loginSuccess, currentState => {
    return {
      ...currentState,
      isLoggedIn: true,
      isLoggingIn: false
    }
  }),
  
  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false
    }
  })

)

export function loginReducer(state: LoginState = initialState, action: any) {
  return reducer(state, action);
}
