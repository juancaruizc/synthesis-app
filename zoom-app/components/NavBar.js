import Image from "next/image";
import Link from "next/link";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.mainNav}>
      <Link href="/">
        <Image src="/synthesis-logo.svg" width={80} height={30} />
      </Link>
      <Link href="/about">
        <a className={styles.about}>Why Synthesis</a>
      </Link>
    </nav>
  );
};

export default NavBar;
