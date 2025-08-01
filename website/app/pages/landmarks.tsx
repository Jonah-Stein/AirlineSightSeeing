import Navbar from "components/Navbar";
import type { Route } from "./+types/home";

export default function Landmarks() {
  return (
    <div>
      <title>Landmarks</title>
      <meta name="description" content="Landmarks page of the website" />
      <Navbar />
      <h1>Landmarks</h1>
      <p>
        This page will be used to display the landmarks both of the user and
        other cool ones that they may like to see
      </p>
    </div>
  );
}
