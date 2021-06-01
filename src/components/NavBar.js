import Link from "next/link";
import styles from "../../styles/Navbar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={styles.brand}>Note App</a>
      </Link>
      <Link href="/new">
        <a className={styles.create}>Create</a>
      </Link>
    </nav>
  );
};

export default NavBar;
