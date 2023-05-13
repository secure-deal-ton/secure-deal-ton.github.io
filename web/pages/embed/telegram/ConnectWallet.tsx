import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTelegramWebApp } from './useTelegramWebApp';

type Props = {};

export function ConnectWallet(_props: Props) {
    const webApp = useTelegramWebApp();
    const user = webApp?.initDataUnsafe?.user;

    return (
        <>
            <p>Hey{user ? ` ${user.first_name}` : ''}!</p>
            <p>Please connect your wallet to make transaction in TON-blockchain.</p>

            <TonConnectButton />
        </>
    );
}
