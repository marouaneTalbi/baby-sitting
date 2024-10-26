import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';
import ConfirmationModal from './ConfirmationModal';
import sendRequest from '../../services/aixosRequestFunction';

const Users = ({user}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => { 
      const endpoint = `/api/users`; 
      const method = 'get';
      try {
          const response = await sendRequest(endpoint, method, {}, true);
          setUsers(response['hydra:member']);
          setLoading(false);
          return response;
      } catch (error) {
          console.error('Failed to get Users:', error); 
      }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleAdd = () => {
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    const endpoint = `/api/users/${userToDelete.id}`; 
    const method = 'delete';
    try {
      await sendRequest(endpoint, method, {}, true);
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setIsConfirmOpen(false);
      setUserToDelete(null);
    } catch (err) {
      setError('Erreur lors de la suppression de l\'utilisateur.');
      setIsConfirmOpen(false);
    }
  };

  const handleFormSubmit = (user) => {
    if (currentUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([user, ...users]);
    }
    setIsFormOpen(false);
  };

  const showUserRole = (role) => {
    console.log(role)
    // if(role){
    //   const currentRole = role.join()
    //   if(currentRole == 'ROLE_WORKER') {
    //     return 'Worker'
    //   } else if (role == 'ROLE_PARENT') {
    //     return 'Parent'
    //   } else {
    //     return 'Admin'
    //   }
    // }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-200 p-20">
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Utilisateurs</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter un utilisateur
        </button>
      </div> */}

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Prénom</th>
              <th className="py-3 px-6 text-left">Nom</th>
              <th className="py-3 px-6 text-left">Email</th>
              {/* <th className="py-3 px-6 text-left">Role</th> */}
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6">{user.firstname}</td>
                <td className="py-4 px-6">{user.lastname}</td>
                <td className="py-4 px-6">{user.email}</td>
                {/* <td className="py-4 px-6">{showUserRole(user)}</td> */}
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <UserForm
          user={currentUser}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {isConfirmOpen && (
        <ConfirmationModal
          message={`Êtes-vous sûr de vouloir supprimer ${userToDelete.firstname} ${userToDelete.lastname} ?`}
          user={user}
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </main>
  );
};

export default Users;
