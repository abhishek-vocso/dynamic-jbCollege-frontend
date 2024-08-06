// "use client";

// import { useEffect, useState } from 'react';
import Link from 'next/link';
import { displayMainNavigation } from '../lib/data';
import styles from '../styles/Navbar.module.css';

const Navbar = async() => {
  const data = await displayMainNavigation(); 


  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </Link>
      <ul className={styles.navList}>
        {data.map((item, index) => (
          <li className={styles.navItem} key={item.id}>
            {item.path ? (
              <Link href={item.path} className={styles.navLink}>
                {item.title}
              </Link>
            ) : (
              <span className={styles.navLink}>{item.title}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
