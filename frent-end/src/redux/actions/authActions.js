import axios from 'axios';
import { ERRORS, SET_USER } from '../types';
import {jwtDecode}  from 'jwt-decode'
export const Registration = (form , navigate) => (dispatch) => {
  console.log('Sending registration request with data:', form); // Debug: Log the form data

  axios
  .post('http://localhost:3010/user/register', form)
  .then((res) => {
    console.log('Registration successful:', res.data);
    navigate('/login')

    dispatch({
      type : ERRORS,
      payload : {}
    })
    
  })
  .catch((err) => {
    dispatch({
      type : ERRORS,
      payload : err.response.data
    })
  });

};

export const LoginAction = (form, navigate) => (dispatch) => {
  axios
    .post('http://localhost:3010/user/login', form)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwt', token);
      const decode = jwtDecode(token);
      dispatch(setUser(decode));

      // Redirect based on role
      if (decode.role === 'ADMIN') {
        navigate('/admin'); // Redirect to Admin Dashboard
      } else if (decode.role === 'EMPLOYE') {
        navigate('/user-dashboard'); // Redirect to User Dashboard
      }
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const logout = ()=> dispatch =>{
  localStorage.removeItem('jwt')
  dispatch({
    type : SET_USER ,
    payload : {}
  })
} 

export const setUser = (decode)=>({
  type : SET_USER ,
  payload : decode
})


