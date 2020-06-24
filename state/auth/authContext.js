import React from 'react';
import actionTypes from './actionTypes';

export const AuthContext = React.createContext();

export const initialState = {
  userId: null,
  isLoading: true,
  userToken: null,
};

export const reducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.RETRIEVE_TOKEN:
      return {
        ...prevState,
        isLoading: false,
        userId: action.id,
        userToken: action.token,
      };
    case actionTypes.LOGIN:
      return {
        ...prevState,
        userId: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case actionTypes.REGISTER:
      return {
        ...prevState,
        userId: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...prevState,
        userId: null,
        userToken: null,
        isLoading: false,
      };
    default:
      return {
        ...prevState,
      };
  }
};
