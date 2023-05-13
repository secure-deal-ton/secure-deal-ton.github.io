import React from 'react';
import { Helmet } from 'react-helmet';
import { SendTransactionRequest, useTonWallet } from '@tonconnect/ui-react';
import { ConfirmTransaction } from './ConfirmTransaction';
import { ConnectWallet } from './ConnectWallet';
import '../../../styles.scss';
import './styles.scss';

const ACTIONS: Record<string, () => SendTransactionRequest['messages']> = {
    deploy: getDeployMessages,
};

function getDeployMessages(): SendTransactionRequest['messages'] {
    return [
        {
            address: '0:b917d4aafbb7155b49a5086bdd32581901d72ceaf4f19f84ed06b1dcbcdd5e89',
            amount: '20000000',
            // stateInit: 'base64bocblahblahblah==',
            // payload: 'base64bocblahblahblah==',
        },
    ];
}

type Props = {};

export function Page(_props: Props) {
    const wallet = useTonWallet();
    const searchParams = new URLSearchParams(document ? document.location.search : '');
    const action = searchParams.get('act');
    const getMessages = action ? ACTIONS[action] : undefined;

    return (
        <>
            <Helmet>
                <body className="telegram" />
            </Helmet>

            {getMessages ? (
                wallet ? (
                    <ConfirmTransaction messages={getMessages()} />
                ) : (
                    <ConnectWallet />
                )
            ) : (
                <p>Unknown action: {action}</p>
            )}
        </>
    );
}
