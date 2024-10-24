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
            return allWorkers;
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
            const r = updatedProfiles.filter(profile =>
                profile.userServices[0].service.name === service
            );

            console.log(r)
        }

        setFilteredProfiles(updatedProfiles);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
           { filteredProfiles.length > 0 ?
             <div className="flex flex-wrap justify-center p-3">   
                <div className="flex space-x-3 mb-1 p-1">
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={addressFilter}
                        onChange={(e) => setAddressFilter(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                        >
                        <option value="Tutoring">Tutoring</option>
                        <option value="Babysitting">Babysitting</option>
                        <option value="Cleaning">Cleaning</option>
                    </select>
                    <button
                        onClick={handleFilter}
                        className="p-2 bg-blue-500 text-white rounded"
                    >
                        Search
                    </button>
                </div>
                <div className="flex flex-wrap justify-start p-3">
                    {filteredProfiles ? filteredProfiles.map((profile) => (
                        <CardProfile key={profile.id} profile={profile} />
                    )) : 'Loading ...'}
                </div>
            </div> 
            : 'Loding ...'
           }
        </main>
    );
};

export default Worker;
