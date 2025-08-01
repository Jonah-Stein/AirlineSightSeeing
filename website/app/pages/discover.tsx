import Navbar from "components/Navbar";
import type { Route } from "./+types/home";

export default function Discover() {
  return (
    <div>
      <title>Discover</title>
      <meta
        name="description"
        content="Discover new flights and social posts"
      />
      <Navbar />
      <h1>Discover</h1>
      <p>
        This page will be used to discover new flights and to see other users
        social posts
      </p>
    </div>
  );
}
