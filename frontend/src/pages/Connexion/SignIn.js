import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/img.webp';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import sendRequest from '../../services/aixosRequestFunction';
import axios from 'axios';

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    try {
        return sendRequest(
            '/api/login',
            'post',
            {
                email: email,
                password: password,
            },
             false
        ).then((response) => {
          console.log(response)
            if(response) {

              console.log(')))',response)
                // setToken(response.token)
                // setUser(response);
                localStorage.setItem('token', response.token);
                localStorage.setItem('refresh_token', response.refresh_token);
                localStorage.setItem('user', JSON.stringify(response));
                return true;
            } else {
                return false;
            }
        })
    } catch (error) {
        console.log('===>',error)
    }
};

  const handleSubmit = async (e) => {
      e.preventDefault();
      // setIsLoading(true);
      try {
          const success = await login(email, password);
          // if (success) {
          //     toast.success('Vous êtes Connecté !');
          //     // setIsLoading(false);
          //     // navigate("/");
          // }
      } catch (error) {
          // setIsLoading(false);
          // toast.error("Username ou mot de passe incorrect");
      }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
        </div>
      <div className="w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-8 text-center">Sign In</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              {/* <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign In
              </button> */}
              <Button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" type="submit" color="blue" disabled={isLoading}>{isLoading ? 'Connexion...' : 'Connexion'}</Button>
            </div>
            <div className="text-center">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;