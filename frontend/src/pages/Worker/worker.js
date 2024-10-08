import React, { useEffect, useState } from 'react';
import sendRequest from '../../services/aixosRequestFunction';
import CardProfile from '../../components/CardProfile';

const Worker = () => {
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [priceFilter, setPriceFilter] = useState('');
    const [addressFilter, setAddressFilter] = useState('');

    const getWorkers = async () => {
        try {
            const endpoint = `/api/users_with_profiles`; 
            const method = 'get';
            const response = await sendRequest(endpoint, method, {}, true);
            console.log(response)
            return response;
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

        setFilteredProfiles(updatedProfiles);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="flex flex-wrap justify-center p-3">   
                <div className="flex space-x-4 mb-4 p-3">
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
                    <button
                        onClick={handleFilter}
                        className="p-2 bg-blue-500 text-white rounded"
                    >
                        Apply Filters
                    </button>
                </div>
                <div className="flex flex-wrap justify-center p-3">
                    {filteredProfiles ? filteredProfiles.map((profile) => (
                        <CardProfile key={profile.id} profile={profile} />
                    )) : 'Loading ...'}
                </div>
            </div>
        </main>
    );
};

export default Worker;
