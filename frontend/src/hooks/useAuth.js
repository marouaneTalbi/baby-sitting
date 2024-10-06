import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const useCurrentUser = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('user');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded)
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, ['user']);

  return decodedToken;
};

export default useCurrentUser;