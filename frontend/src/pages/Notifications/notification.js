import React, { useEffect, useState } from 'react';
import useCurrentUser from '../../hooks/useAuth';
import sendRequest from '../../services/aixosRequestFunction';

const Notifications = ({user}) => {
    const [notifications, setNotifications] = useState([]);
    const [role, setRole] = useState();

    useEffect(() => {
        if (user) {
            setRole(user.role.join())
            getNotifs().then((notifs) => {
                if (notifs) {
                    console.log(notifs)
                    setNotifications(notifs);
                }
            });
        }
    }, [user]);

    const getNotifs = async () => { 
        if (user) {
            const isParent = role === 'ROLE_PARENT' ? 'parent' : 'serviceProvider'
            const endpoint = `/api/notifications?${isParent}=${user.id}`; 
            const method = 'get';
            try {
                const response = await sendRequest(endpoint, method, {}, true);
                return response['hydra:member'];
            } catch (error) {
                console.error('Failed to get Users:', error); 
            }
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Notifications</h1>

                {user && notifications.length > 0 ? (
                    notifications.map((notif, index) => (
                        <div 
                            key={index} 
                            className="bg-white shadow-md rounded-lg p-6 mb-6 border-l-4 border-blue-500"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Notification #{notif.notification_id}
                                </h2>
                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${notif.seen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {notif.seen ? 'Vu' : 'Non vu'}
                                </span>
                            </div>
                            <p className='mb-2 text-xl'>
                                {
                                    role === 'ROLE_PARENT' ? 

                                    `Vous avez toutes les information de ${notif.serviceProvider?.lastname}, contactez le pour des que vous pouvez.` :
                                    `${notif.serviceProvider?.lastname} a reserver un de vos creneau il vous contacteras dans les prochaines heures` 

                                }
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                {
                                    role === 'ROLE_PARENT'  ?
                                        <div>
                                        <h3 className="text-lg font-medium text-gray-700">Service Provider:</h3>
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Nom: </span>{notif.serviceProvider?.lastname}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Prénom: </span>{notif.serviceProvider?.firstname}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Email: </span>{notif.serviceProvider?.email}
                                        </p>
                                        { notif.serviceProvider.profile && (
                                            <>
                                                <p className="text-gray-600">
                                                    <span className="font-semibold">Adresse: </span>{notif.serviceProvider.profile.address}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-semibold">Téléphone: </span>{notif.serviceProvider.profile.phone}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-semibold">Taux horaire: </span>{notif.serviceProvider.profile.rate_per_hour} €
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-semibold">Description: </span>{notif.serviceProvider.profile.description}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    :

                                    <div>
                                    <h3 className="text-lg font-medium text-gray-700">Parent:</h3>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Nom: </span>{notif.parent.lastname}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Prénom: </span>{notif.parent.firstname}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Email: </span>{notif.parent.email}
                                    </p>
                                    { notif.parent.profile && (
                                        <>
                                            <p className="text-gray-600">
                                                <span className="font-semibold">Adresse: </span>{notif.parent.profile.address}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-semibold">Téléphone: </span>{notif.parent.profile.phone}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-semibold">Taux horaire: </span>{notif.parent.profile.rate_per_hour} €
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-semibold">Description: </span>{notif.parent.profile.description}
                                            </p>
                                        </>
                                    )}
                                </div>
                                }
                             

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Loading ...</p>
                )}
            </div>
        </main>
    );
};

export default Notifications;
