import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/img.webp';
import {  toast } from 'react-toastify';
import { Button} from 'flowbite-react';
import sendRequest from '../../services/aixosRequestFunction';
import {jwtDecode} from 'jwt-decode';
import { useUser } from '../../hooks/Auth';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser(); 
  const [error, setError] = useState(null);


  const login = async (email, password) => {
    try {
        return sendRequest('/api/login','post',
            {
                email: email,
                password: password,
            },
             false
        ).then((response) => {
            if(response) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('refresh_token', response.refresh_token);
                localStorage.setItem('user', JSON.stringify(response));
                const decoded = jwtDecode(response.token);
                setUser(decoded); 

                return decoded;
            } else {
                return false;
            }
        }).catch(() =>{
          setError("Email ou mot de passe invalide")
          console.error('===>',error)
        })
    } catch (error) {
        setError("Email ou mot de passe invalide")
        console.log('===>',error)
    }
};

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
          const response = await login(email, password);
          const isParent = response.roles.join() === 'ROLE_PARENT'
          if (isParent) {
              navigate("/workers");
          } else {
            navigate("/dashboard");
          }
          setIsLoading(false);

      } catch (error) {
          setIsLoading(false);
          toast.error("Username ou mot de passe incorrect");
      }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
        </div>
      <div className="w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-8 text-center">Sign In</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">{error}</strong>
            </div>
          )}
          <form className="space-y-6 mt-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>

              <Button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" type="submit" color="blue" disabled={isLoading}>{isLoading ? 'Connexion...' : 'Connexion'}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
