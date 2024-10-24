import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import sendRequest from '../../services/aixosRequestFunction';

const Profile = ({user}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [rate, setRate] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState();
  const [services, setServices] = useState();
  const [service, setService] = useState('');
  const [serviceOfUser, setServiceOfUser] = useState('');


  useEffect(() => {
    if(user) {
      console.log(user)
        setRole(user.role.join())
        if(user.profile){
            setPhone(user.profile.phone || 0)
            setAddress(user.profile.address)
            setRate(user.profile.rate_per_hour)
            setDescription(user.profile.description)
            setProfile(user.profile.id)
            if(user.userServices.length > 0) {
              setServiceOfUser(user.userServices[0])
            }
        }
        getServices().then(setServices)
    }
  }, [user, profile]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const endpoint = profile ? `/api/profiles/${profile}` :`/api/profiles`; 
      const updatedData = {
          phone: phone,
          address: address,
          description: description,
          ratePerHour: rate,
          user: `/api/users/${user.id}`,
          availability:""
        };
      const method = profile ? 'put' : 'post';
      const response = await sendRequest(endpoint, method , updatedData, true);
      setPhone(response.phone)
      setAddress(response.address)
      setRate(response.rate_per_hour)
      setDescription(response.description)
      setProfile(response.id)
      setIsModalOpen(false)
      if(role === "ROLE_WORKER"){
        addServiceToUser()
      }
      return response;
    } catch (error) {
      console.error('Failed to update profile:', error); 
    }
  }

  const addServiceToUser = async () => {
    try {
      const serviceUserId = serviceOfUser ? serviceOfUser['@id'].replace('/api/user_services/','') :''
      const endpoint = serviceOfUser !== '' ? `/api/user_services/${serviceUserId}` : `/api/user_services`; 
      const serviceUri = service !== '' ? service : serviceOfUser.service.id
      const data = {
        userId: `/api/users/${user.id}`,
        service: `/api/services/${serviceUri}`,
      };
      const method =  serviceOfUser !== '' ? 'put':'post';
      const response = await sendRequest(endpoint, method , data, true);
      const updatedService = services.find(item => item['@id'] === response.service)
      const currenService = {
        "@id": response['@id'],
        "@type": response['@type'],
        service: updatedService
      }
      setServiceOfUser(currenService)
      return response["hydra:member"];
    } catch (error) {
      console.error('Failed to update profile:', error); 
    }
  }

  const getServices = async () => {
    try {
      const endpoint = `/api/services`; 
      const method = 'get';
      const response = await sendRequest(endpoint, method , {}, true);
      return response["hydra:member"];
    } catch (error) {
      console.error('Failed to update profile:', error); 
    }
  }

  if (!user) return <p>Loading...</p>;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-2">Profile</h1>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <span className="w-32 font-bold text-gray-700">Name:</span>
            <span className="text-gray-900">{`${user.firstname} ${user.lastname}`}</span>
          </div>

          <div className="flex items-center">
            <span className="w-32 font-bold text-gray-700">Email:</span>
            <span className="text-gray-900" >{user.email}</span>
          </div>

          {profile && (
            <>
              <div className="flex items-center">
                <span className="w-32 font-bold text-gray-700">Phone:</span>
                <span className="text-gray-900">{phone}</span>
              </div>

              <div className="flex items-center">
                <span className="w-32 font-bold text-gray-700">Address:</span>
                <span className="text-gray-900">{address}</span>
              </div>

            {
                profile && role === "ROLE_WORKER" &&
                <>
                <div className="flex items-center">
                    <span className="w-32 font-bold text-gray-700">Service :</span>
                    <span className="text-gray-900">{serviceOfUser?.service?.name} </span>
                </div>
                <div className="flex items-center">
                    <span className="w-32 font-bold text-gray-700">Rate/Hour:</span>
                    <span className="text-gray-900">{rate} </span>
                </div>

                <div className="mt-6">
                    <h2 className="font-bold text-gray-700 mb-2">Description</h2>
                    <p className="text-gray-900">{description}</p>
                </div>
                </>
            }
            </>
          )}


          {/* Edit Profile Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleOpenModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit Profile">
        <form onSubmit={updateData}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter your phone Number"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter your Address"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {
            role === "ROLE_WORKER" &&
            <>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rate per hour</label>
                    <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter your Rate per Hour"
                    defaultValue={rate}
                    onChange={(e) => setRate(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter a description"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Services</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    >
                      {
                        services && services.map((item) => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))
                      }
                    </select>
                </div>
            </>
          }

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 mr-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default Profile;
