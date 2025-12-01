import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img src='img-1.jpg' alt='person with dog overlooking mountain with sunset' />
        <div>
          <h2>About travelboxd.</h2>
          <p>
            Travelboxd is a sleek and intuitive travel tracker app designed to make exploring the world more organized
            and memorable. It allows users to log trips, keep track and keep track of visited destinations.Travelboxd
            turns every journey into a digital diary, helping travelers reflect on experiences and plan future
            adventures effortlessly.
          </p>
          <p>
            Its user-friendly interface ensures that capturing memories and sharing travel stories is both simple and
            enjoyable.
          </p>
        </div>
      </section>
    </main>
  );
}
