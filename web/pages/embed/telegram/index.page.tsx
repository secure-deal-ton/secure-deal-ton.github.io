import React from 'react';
import { useTelegramWebApp } from './useTelegramWebApp';

type Props = {};

export function Page(_props: Props) {
    const webApp = useTelegramWebApp();
    if (!webApp) return null;

    const { user } = webApp.initDataUnsafe;

    return (
        <>
            <h1>Hello Telegram!</h1>

            {user ? (
                <p>
                    Username: {user.first_name} {user.last_name}
                </p>
            ) : null}
        </>
    );
}
