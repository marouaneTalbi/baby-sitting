import React, { useEffect, useState } from 'react';
import bgImage from '../../assets/images/img.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import sendRequest from '../../services/aixosRequestFunction';
import { Button} from 'flowbite-react';

const Signup = () => {

  const location = useLocation();
  const [role, setRole] = useState(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const currentRole = location.search.includes('worker') ? 'Babysitter/Housekeeper' : 'Parent';
    setRole(currentRole)
  } , [location]);

  const register = (firstname, lastname, email, password) => {
    const currentRole = role === "Parent" ? "ROLE_PARENT" : "ROLE_WORKER"
    return sendRequest(
      '/api/users',
      'post',
      {
          email: email,
          password: password,
          lastname: lastname,
          firstname: firstname,
          role: currentRole
      },
       false
    ).then((response) => {
        if(response) {
          console.log(response)
            return true;
        } else {
            return false;
        }
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const success = await register(firstname, lastname, email, password);
        if (success) {
            setIsLoading(false);
            navigate("/signin");
        }
    } catch (error) {
        setIsLoading(false);
        toast.error("Username ou mot de passe incorrect");
    }

  }



  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
</div>

      <div className="w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-8 text-center">Sign Up</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">You are</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={role}
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <Button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" type="submit" color="blue" disabled={isLoading}>{isLoading ? 'Sign Up...' : 'Sign Up'}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
