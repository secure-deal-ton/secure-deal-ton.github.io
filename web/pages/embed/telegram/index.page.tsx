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

function getAction(): string | null {
    if (!location) return null;
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('act');
}

function getMessages(action: string): SendTransactionRequest['messages'] {
    return ACTIONS[action]?.() ?? [];
}

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

function Content() {
    const wallet = useTonWallet();
    if (!wallet) return <ConnectWallet />;

    const action = getAction();
    if (!action) return <p>Action is not defined</p>;

    const messages = getMessages(action);
    if (!messages.length) return <p>Unknown action: {action}</p>;

    return <ConfirmTransaction messages={messages} />;
}

type Props = {};

export function Page(_props: Props) {
    return (
        <>
            <Helmet>
                <body className="telegram" />
            </Helmet>

            <Content />
        </>
    );
}
