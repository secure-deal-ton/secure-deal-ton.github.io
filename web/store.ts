import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { tonwebReducer, tonwebReducerPath } from './features/tonweb/tonwebSlice';

export const rootReducer = combineReducers({
    [tonwebReducerPath]: tonwebReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
