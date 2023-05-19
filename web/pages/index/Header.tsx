import React from 'react';
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import styles from './Header.module.scss';

const MENU = [
    { title: 'Use', link: '#' },
    { title: 'Pricing', link: '#' },
    { title: 'Community', link: '#' },
];

function getShortAddress(hex: string): string {
    const address = toUserFriendlyAddress(hex);
    return `${address.slice(0, 4)}..${address.slice(-4)}`;
}

type Props = {};

export function Header(props: Props) {
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();

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

                <div className="col-md-2 text-end">
                    {wallet ? (
                        <button className="btn btn-outline-secondary" onClick={() => tonConnectUI.disconnect()}>
                            Disconnect {getShortAddress(wallet.account.address)}
                        </button>
                    ) : (
                        <button className="btn btn-outline-secondary" onClick={() => tonConnectUI.connectWallet()}>
                            Connect wallet
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
