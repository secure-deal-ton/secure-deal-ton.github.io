import React from 'react';
import '../../styles.scss';
import { Header } from './Header';

type Props = {};

export function Page(_props: Props) {
    return (
        <>
            <Header />

            <div className="container my-5 py-5">
                <div className="d-flex my-5 py-5 flex-column align-items-center">
                    <h1 className="display-1 fw-bold text-center mb-5">
                        Escrow accounts
                        <div className="display-3 text-secondary">backed on TON-blockchain</div>
                    </h1>

                    <a href="https://t.me/SecureDealTonBot?start" className="btn btn-primary btn-lg">
                        Open Telegram bot
                    </a>
                </div>
            </div>
        </>
    );
}
