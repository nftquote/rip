import type { ActorSubclass } from '@dfinity/agent';
import { createActor } from '../../../idl';
import type { _SERVICE } from '../../../idl/minter.did';

let client: ActorSubclass<_SERVICE>;

export function getMinterClient(): ActorSubclass<_SERVICE> {
    if (!client) {
        client = createActor(process.env.MINTER_CANISTER_ID);
    }

    return client;
}