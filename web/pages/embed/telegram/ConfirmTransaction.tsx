import React, { useCallback } from 'react';
import { useTonConnectUI, useTonAddress, CHAIN, SendTransactionRequest } from '@tonconnect/ui-react';
import { useTelegramWebApp } from './useTelegramWebApp';

type Props = {
    messages: SendTransactionRequest['messages'];
    isTestnet?: boolean;
};

export function ConfirmTransaction({ messages, isTestnet }: Props) {
    const webApp = useTelegramWebApp();
    const userFriendlyAddress = useTonAddress();
    const [tonConnectUI] = useTonConnectUI();
    const user = webApp?.initDataUnsafe?.user;

    const handleConfirm = useCallback(() => {
        tonConnectUI.sendTransaction({
            validUntil: Date.now() + 1000000,
            network: isTestnet ? CHAIN.TESTNET : CHAIN.MAINNET,
            messages,
        });
    }, [tonConnectUI, messages, isTestnet]);
    const handleDisconnect = useCallback(() => tonConnectUI.disconnect(), [tonConnectUI]);

    return (
        <>
            <p>{user ? `${user.first_name}, you` : 'You'} need to confirm the transaction</p>

            <button onClick={handleConfirm}>Confirm transaction</button>

            <p>Connected wallet: {userFriendlyAddress}</p>
            <button onClick={handleDisconnect}>Disconnect wallet</button>
        </>
    );
}
