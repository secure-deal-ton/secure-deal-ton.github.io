import { createStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { tonwebReducer, tonwebReducerPath } from './features/tonweb/tonwebSlice';

export const rootReducer = combineReducers({
    [tonwebReducerPath]: tonwebReducer,
});

// `configureStore` doesn't work with SSR
export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
