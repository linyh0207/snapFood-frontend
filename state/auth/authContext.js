import React from 'react';
import actionTypes from './actionTypes';

export const AuthContext = React.createContext();

export const initialState = {
  user: null,
  isLoading: true,
  userToken: null,
};

export const reducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.RETRIEVE_TOKEN:
      return {
        ...prevState,
        isLoading: false,
        user: action.user,
        userToken: action.token,
      };
    case actionTypes.LOGIN:
      return {
        ...prevState,
        user: action.user,
        userToken: action.token,
        isLoading: false,
      };
    case actionTypes.REGISTER:
      return {
        ...prevState,
        user: action.user,
        userToken: action.token,
        isLoading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...prevState,
        user: null,
        userToken: null,
        isLoading: false,
      };
    default:
      return {
        ...prevState,
      };
  }
};
