import { useEffect, useState } from 'react';
import App from '../../App';
import { Instance } from '../../axios';
import { Routes } from '../../helpers/routeHelper';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const userId = JSON.parse(localStorage.getItem('user'));

  const fetchUserProfile = async () => {
    setIsLoading(true);
    return await Instance.get(Routes.auth.profile + `/${userId.id}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    (async () => {
      const profileDetails = await fetchUserProfile();
      setUserProfile(profileDetails);
    })();
  }, []);

  return (
    <App>
      {isLoading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase mb-10 underline">
              User Profile
            </h1>
            {userProfile?.image && (
              <img className="w-full h-56" src={userProfile.image} alt="Sunset in the mountains" />
            )}
            <div className="px-6 py-4">
              {userProfile?.firstName && userProfile?.lastName && (
                <div className="font-bold text-xl mb-2">
                  {userProfile.firstName} {userProfile.lastName}
                </div>
              )}
              {userProfile?.age && <div className="text-gray-700 text-base">Age: {userProfile.age}</div>}
              {userProfile?.birthDate && (
                <div className="text-gray-700 text-base  mt-1">Birth Date: {userProfile.birthDate}</div>
              )}
              {userProfile?.email && <div className="text-gray-700 text-base  mt-1">Email: {userProfile.email}</div>}
              {userProfile?.phone && <div className="text-gray-700 text-base mt-1">Phone: {userProfile.phone}</div>}
              {userProfile?.university && (
                <div className="text-gray-700 text-base mt-1">University: {userProfile.university}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </App>
  );
}

export default Profile;
