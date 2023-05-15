import React from 'react';
import styles from './Header.module.scss';

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
                    <li>
                        <a className="nav-link link-dark" href="#">
                            Use
                        </a>
                    </li>
                    <li>
                        <a className="nav-link link-dark" href="#">
                            Pricing
                        </a>
                    </li>
                    <li>
                        <a className="nav-link link-dark" href="#">
                            Community
                        </a>
                    </li>
                </ul>

                <div className="col-md-2 text-end"></div>
            </div>
        </nav>
    );
}
