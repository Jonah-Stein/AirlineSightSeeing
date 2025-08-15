import Navbar from "components/Navbar";
import { useMyProfile } from "../hooks/profile";

export default function MyProfile() {
  const { data } = useMyProfile();

  return (
    <div>
      <title>My Profile</title>
      <meta name="description" content="My Profile page of the website" />
      <Navbar />
      <div>
        <h1>My Profile</h1>
        <p>This page will be used to display the profile of the user</p>
        <p>JSON: {JSON.stringify(data)}</p>
        {data?.picture !== null && (
          <img src={data?.picture} alt="Profile Picture" />
        )}
        {data?.picture === null && <p>No picture</p>}
      </div>
    </div>
  );
}
