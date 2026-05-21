'use client';

import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hjem" className={styles.hero} aria-label="Hjem">
      <p className={styles.heroHello}>Hello, cellists!</p>
    </section>
  );
}
