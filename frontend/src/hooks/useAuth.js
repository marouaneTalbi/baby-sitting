import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import sendRequest from '../services/aixosRequestFunction';
import { useUser } from './Auth';

const useCurrentUser = () => {
  const [currentUser, setUser] = useState(null);
  const { user, loading } = useUser();  

  const getUserProfile = async () => {
    if(user){
        try {
            return sendRequest(  `/api/users?email=${user.username}`, 'get',false)
            .then((response) => {
                const userData = {...response['hydra:member'][0], role: user.roles}
                return userData
            })
        } catch (error) {
            console.log('===>',error)
        }
    }
};

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if(user && token){
          try {
            getUserProfile().then(setUser); 
          } catch (error) {
            console.error('Token invalide', error);
          }
    }

  }, [user]); 

  return currentUser; 
};

export default useCurrentUser;