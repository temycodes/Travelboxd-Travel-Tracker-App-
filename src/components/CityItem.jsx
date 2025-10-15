import { useCities } from "../Contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const flagemojiToPNG = (flag) => {
    try {
      const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt(0))
        .map((code) => String.fromCharCode(code - 127397))
        .join("")
        .toLowerCase();
      return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />;
    } catch (error) {
      return <span>{flag}</span>;
    }
  };

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity?.id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{date}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
