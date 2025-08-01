import Navbar from "components/Navbar";
import type { Route } from "./+types/home";

type Params = {
  username: string;
};

export default function Profile({ params }: Route.ComponentProps) {
  const { username } = params as Params;
  return (
    <div>
      <title>Profile</title>
      <meta name="description" content="Profile page of the website" />
      <Navbar />
      <h1>Profile</h1>
      <p>This page will be used to display the profile of the user</p>
      <p>Username: {username}</p>
    </div>
  );
}
