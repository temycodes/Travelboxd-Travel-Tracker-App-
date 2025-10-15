import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          travelboxd keeps track of your adventures.
        </h1>
        <h2>
          An interactive world map that captures every step of your journey. Relive your experiences, celebrate your
          adventures, and share your unique story of exploring the world.
        </h2>
        <Link to='/login' className='cta'>
          Start Exploring
        </Link>
      </section>
    </main>
  );
}
