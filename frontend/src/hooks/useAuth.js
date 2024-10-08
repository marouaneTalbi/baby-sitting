import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import sendRequest from '../services/aixosRequestFunction';

const useCurrentUser = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [user, setUser] = useState(null);


  const getUserProfile = async () => {
    try {
        return sendRequest(
            `/api/me`,
            'get',
             false
        ).then((response) => {
            return response
        })
    } catch (error) {
        console.log('===>',error)
    }
};

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        getUserProfile().then(setUser)
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, ['user']);

  return user;
};

export default useCurrentUser;