import { useTonAddress } from '@tonconnect/ui-react';
import { useFetchDomainInfoQuery } from '../tonweb/tonwebSlice';

const DOMAIN_CONTRACT_ADDRESS = 'EQBaUYdnu2lIKOiATS5X7qpLODOCPHG15ljkxbECYnfLFpx7';

function useDomainOwner(): string | null {
    const { data } = useFetchDomainInfoQuery(DOMAIN_CONTRACT_ADDRESS, {
        refetchOnMountOrArgChange: 600, // 10 minutes
    });
    if (!data) return null;
    if (data.domain !== 'secure-deal') return null; // wrong address?

    return data.owner_address ?? null;
}

export function useIsAdmin(): boolean {
    const wallet = useTonAddress();
    const owner = useDomainOwner();

    if (wallet == null || owner == null) return false;
    return wallet === owner;
}
