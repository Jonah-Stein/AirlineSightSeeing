import type { Route } from "./+types/home";
import Navbar from "components/Navbar";

export default function Home() {
  return (
    <div>
      <title>Home</title>
      <meta name="description" content="Home page of the website" />
      <Navbar />
      <h1>HOME PAGE</h1>
      <p>
        This is the home page of the website. It will be used to display the
        home page of the website.
      </p>
    </div>
  );
}
