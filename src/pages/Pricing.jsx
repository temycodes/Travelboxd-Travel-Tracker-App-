// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Expect More. Pay Less.
            <br />
            Just $5/month.
          </h2>
          <p>
            At just $5, giving you full access to all its travel tracking features. For a small one-time investment, you
            can log your trips, map your journeys, and create a personal travel diary that grows with every adventure.
          </p>
        </div>
        <img src='img-2.jpg' alt='overview of a large city with skyscrapers' />
      </section>
    </main>
  );
}
