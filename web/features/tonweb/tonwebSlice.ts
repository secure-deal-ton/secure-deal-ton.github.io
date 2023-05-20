import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
import { Cell } from 'ton-core';

function parseDomainContent(cell: Cell) {
    const cs = cell.beginParse();

    cs.loadInt(8);
    cs.loadMaybeRef();

    return {};
}

function parseAuction(cell: Cell | null) {
    if (!cell) return null;
    return {};
}

function parseDomainInfo(cell: Cell) {
    const cs = cell.beginParse();

    return {
        index: cs.loadInt(256),
        collection_address: cs.loadAddressAny()?.toString(),
        owner_address: cs.loadAddressAny()?.toString(),
        content: parseDomainContent(cs.loadRef()),
        domain: cs.loadStringRefTail(),
        auction: parseAuction(cs.loadMaybeRef()),
        last_fill_up_time: cs.loadInt(64),
    };
}

const tonwebSlice = createApi({
    reducerPath: 'tonweb',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_TONWEB_API_BASE_URI,
        paramsSerializer: (params) => {
            const searchParams = new URLSearchParams(params);
            searchParams.set('api_key', import.meta.env.VITE_TONWEB_API_KEY);
            return searchParams.toString();
        },
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === REHYDRATE) {
            return action['payload']?.[reducerPath];
        }
    },
    endpoints: (builder) => ({
        fetchDomainInfo: builder.query({
            query: (address: string) => ({
                url: '/getAddressInformation',
                params: { address },
            }),
            transformResponse: (responseData: { ok: boolean; result: { data: string } }) => {
                const { ok, result } = responseData;
                if (!ok) return null;
                return parseDomainInfo(Cell.fromBase64(result.data));
            },
        }),
    }),
});

export const { useFetchDomainInfoQuery } = tonwebSlice;

export const tonwebMiddleware = tonwebSlice.middleware;
export const tonwebReducerPath = tonwebSlice.reducerPath;
export const tonwebReducer = tonwebSlice.reducer;
