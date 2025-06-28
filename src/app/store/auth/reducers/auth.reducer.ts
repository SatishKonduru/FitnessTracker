import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './../actions/auth.actions';
import { AuthState } from './../models/auth-state.model';

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, { user }) => ({
      ...state,
      user,
      loading: false,
      isAuthenticated: true,
    })
  ),

  on(
    AuthActions.loginFailure,
    AuthActions.registerFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    loading: false,
    isAuthenticated: false,
  })),

  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
