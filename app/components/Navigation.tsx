'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useState } from 'react';
import styles from './Navigation.module.css';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '#hjem', label: 'Hjem' },
  { href: '#om-oss', label: 'Om oss' },
  { href: '#aktiviteter', label: 'Aktiviteter' },
  { href: '#kalender', label: 'Kalender' },
  { href: '#kontakt', label: 'Kontakt' },
] as const;

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <nav className={styles.nav} aria-label="Hovednavigasjon">
      <div className={styles.navContainer}>
       <div className={styles.logo}>
  <Image src="/logo2.png" alt="Bergen Celloforeningen" width={100} height={100} style={{objectFit: 'contain'}} />
  <span>Bergen Celloforeningen</span>
</div>
        <ul className={styles.navLinks}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <div className={styles.navActions}>
          <Link href="/bli-medlem" className={styles.ctaButton}>
  Bli Medlem
</Link>
          <button
            type="button"
            className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ''}`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.menuIcon} aria-hidden>
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
            </span>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <>
          <div className={styles.menuBackdrop} aria-hidden onClick={closeMenu} />
          <div
            id={menuId}
            className={styles.mobileMenu}
            role="navigation"
            aria-label="Mobilmeny"
          >
            <ul className={styles.mobileNavList}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.mobileNavLink} onClick={closeMenu}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </nav>
  );
}
