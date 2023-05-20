import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { tonwebMiddleware, tonwebReducer, tonwebReducerPath } from './features/tonweb/tonwebSlice';

export const store = configureStore({
    reducer: {
        [tonwebReducerPath]: tonwebReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tonwebMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

Object.assign(globalThis, { redux: store });
