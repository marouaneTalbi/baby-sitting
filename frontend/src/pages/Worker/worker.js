import React, { useEffect, useState } from 'react';
import sendRequest from '../../services/aixosRequestFunction';
import CardProfile from '../../components/CardProfile';

const Worker = () => {
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [priceFilter, setPriceFilter] = useState('');
    const [addressFilter, setAddressFilter] = useState('');
    const [service, setService] = useState('');

    const getWorkers = async () => {
        try {
            const endpoint = `/api/users?role=ROLE_WORKER`; 
            const method = 'get';
            const response = await sendRequest(endpoint, method, {}, true);
            const allWorkers = response['hydra:member'].filter(item => item.profile !== undefined)
            const filteredWorkers = allWorkers.filter(item => item.userServices.length > 0)
            return filteredWorkers;
        } catch (error) {
            console.error('Failed to get Users:', error); 
        }
    };
    
    useEffect(() => {
        getWorkers()
            .then(data => {
                setProfiles(data);
                setFilteredProfiles(data);
            })
            .catch(error => console.error(error)); 
    }, []);

    const handleFilter = () => {
        let updatedProfiles = [...profiles];
        
        if (priceFilter) {
            updatedProfiles = updatedProfiles.filter(profile =>
                parseFloat(profile.profile.rate_per_hour) <= parseFloat(priceFilter)
            );
        }
        if (addressFilter) {
            updatedProfiles = updatedProfiles.filter(profile =>
                profile.profile.address.toLowerCase().includes(addressFilter.toLowerCase())
            );
        }
        if (service) {
            updatedProfiles = updatedProfiles.filter(profile => {
                if(profile.userServices.length > 0) {
                    return profile.userServices[0]?.service.name === service
                }
            }
            );
        }
        setFilteredProfiles(updatedProfiles);
    };

    return (
        <main className="min-h-screen flex flex-col items-center bg-gray-100">
            <div className="sticky top-0 w-full bg-white shadow-md z-10 p-4">
                <div className="flex justify-center space-x-3">
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={addressFilter}
                        onChange={(e) => setAddressFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="">Choisir un service</option>
                        <option value="Tutoring">Tutoring</option>
                        <option value="Babysitting">Babysitting</option>
                        <option value="Cleaning">Cleaning</option>
                    </select>
                    <button
                        onClick={handleFilter}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap justify-center p-5 w-full">
                {filteredProfiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProfiles.map((profile) => (
                            <CardProfile key={profile.id} profile={profile} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </main>
    );
};

export default Worker;
