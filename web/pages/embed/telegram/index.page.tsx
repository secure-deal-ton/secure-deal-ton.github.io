import React from 'react';
import { Helmet } from 'react-helmet';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { useTelegramWebApp } from './useTelegramWebApp';
import '../../../styles.scss';
import './styles.scss';

type Props = {};

export function Page(_props: Props) {
    const webApp = useTelegramWebApp();
    const userFriendlyAddress = useTonAddress();
    const user = webApp?.initDataUnsafe?.user;

    return (
        <>
            <Helmet>
                <body className="telegram" />
            </Helmet>

            <h1>Hello Telegram!</h1>

            {user ? (
                <p>
                    Username: {user.first_name} {user.last_name}
                </p>
            ) : null}

            <p>TON Address: {userFriendlyAddress}</p>

            <TonConnectButton />

            <p>Telegram Init Data:</p>
            <pre>
                <code>{JSON.stringify(webApp?.initDataUnsafe)}</code>
            </pre>
        </>
    );
}
