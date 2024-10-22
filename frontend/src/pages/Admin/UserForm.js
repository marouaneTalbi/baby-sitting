import React, { useState, useEffect } from 'react';
import sendRequest from '../../services/aixosRequestFunction';

const UserForm = ({ user, onClose, onSubmit }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
        console.log(user)
      setFirstname(user.firstname || '');
      setLastname(user.lastname || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!firstname || !lastname) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    const endpoint = `/api/users/${user.id}`; 
    const method = 'put';
    const data = {
        firstname: firstname,
        lastname: lastname,
        role: role,
        email: user.email,
        password: user.password
    }
    try {
      const response = await sendRequest(endpoint, method, data, true);
      console.log(response)
      onSubmit(response);

    } catch (err) {
      setError('Erreur lors de la modification de l\'utilisateur.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-2xl font-bold mb-4">
          {user ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-gray-700">Rôle</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="ROLE_WORKER">Worker</option>
              <option value="ROLE_PARENT">Parent</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div> */}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {user ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
