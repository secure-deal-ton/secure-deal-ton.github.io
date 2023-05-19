import React from 'react';
import styles from './Header.module.scss';

const MENU = [
    { title: 'Use', link: '#' },
    { title: 'Pricing', link: '#' },
    { title: 'Community', link: '#' },
];

type Props = {};

export function Header(props: Props) {
    return (
        <nav className={`navbar sticky-top navbar-light ${styles.navbar}`}>
            <div className="container justify-content-between">
                <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-start">
                    <a className="navbar-brand d-flex align-items-center" href="/">
                        <img className={styles.logotype} src="/logotype.svg" />
                        Secure Deal TON
                    </a>
                </div>

                <ul className="col-12 col-md-auto nav justify-content-center">
                    {MENU.map((item) => (
                        <li>
                            <a className={`nav-link link-dark ${styles.navLink}`} href={item.link}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="col-md-2 text-end"></div>
            </div>
        </nav>
    );
}
