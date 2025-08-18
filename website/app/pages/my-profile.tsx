import Navbar from "components/Navbar";
import { useMyProfile } from "../hooks/profile";
import { useState } from "react";
import { useGetMyPhotos } from "app/hooks/photos";
import { Link } from "react-router";

export default function MyProfile() {
  const [showPhotos, setShowPhotos] = useState(false);
  const { data } = useMyProfile();

  const { data: photos, refetch } = useGetMyPhotos({ enabled: showPhotos });

  const handleShowPhotos = async () => {
    setShowPhotos(!showPhotos);
    await refetch();
  };

  return (
    <div className="profile-container">
      <title>My Profile</title>
      <meta name="description" content="My Profile page of the website" />
      <Navbar />

      <div className="profile-card">
        <div className="profile-header">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-blue-100 mt-2">Manage your account information</p>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex-shrink-0">
              {data?.picture ? (
                <img
                  src={data.picture}
                  alt="Profile Picture"
                  className="profile-picture"
                />
              ) : (
                <div className="profile-picture bg-gray-300 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                {data?.profile_name || "Unnamed Profile"}
              </h2>
              <p className="text-gray-600">{data?.bio || "No bio added yet"}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="profile-detail">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Profile Name
              </h3>
              <p className="text-lg text-gray-900">
                {data?.profile_name || "Not set"}
              </p>
            </div>

            <div className="profile-detail">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                User ID
              </h3>
              <p className="text-lg text-gray-900 font-mono text-sm">
                {data?.user || "Not available"}
              </p>
            </div>

            <div className="profile-detail md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Bio
              </h3>
              <p className="text-lg text-gray-900">
                {data?.bio ||
                  "No bio has been added yet. Click edit to add one!"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4">
            <button className="action-button">Edit Profile</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Change Picture
            </button>
            <button className="action-button" onClick={handleShowPhotos}>
              Show Photos
            </button>
          </div>

          {showPhotos && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                My Photos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {photos?.map((photo) => (
                  <div key={photo.id}>
                    <Link to={`/photo/${photo.id}`}>
                      <img
                        src={photo.imageUrl}
                        alt={photo.id}
                        // style={{ cursor: "pointer" }}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Debug Info (remove in production) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                Debug Info
              </h4>
              <pre className="text-xs text-yellow-700 overflow-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
