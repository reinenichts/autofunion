import axios from 'axios';
import {
  SIGN_OUT_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAIL
} from './types';
import { BASE_URL } from '../config';

const URL = `${BASE_URL}/authentication`;

export function signInAction({ username, email, password }, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/token/`, { username, password });
      const { user } = res.data;
      const token = {
        access_token: res.data.token.access_token,
        refresh_token: res.data.token.refresh_token,
      };
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token }
      });
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      // history.push('/profile');
    } catch(error) {
      console.log(error);
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: 'Login Failed'
      });
    }
  };
}

export function signOutAction(history) {
  return async (dispatch) => {
    try {
      localStorage.setItem('token', {});
      localStorage.setItem('user', {});
      history.push('/');
      dispatch({ type: SIGN_OUT_USER });
    } catch(error) {
      console.log(error);
    }
  };
}

export function signUpAction({ username, invite_token, password }, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/register/`, { username, password, invite_token });
      const { user } = res.data;
      const token = {
        access_token: res.data.token.access_token,
        refresh_token: res.data.token.refresh_token,
      };
      dispatch({
        type: SIGN_UP_USER_SUCCESS,
        payload: { user, token }
      });
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      // history.push('/profile');
    } catch(error) {
      console.log(error);
      dispatch({
        type: SIGN_UP_USER_FAIL,
        payload: 'Sign Up Failed'
      });
    }
  };
}
