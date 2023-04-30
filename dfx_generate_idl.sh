#!/bin/sh

dfx generate
# direct instance creatation occurs error
sed -e 's/export const minter = createActor(canisterId);//g' idl/index.js > idl/index.tmp.js
mv idl/index.tmp.js idl/index.js
sed -e 's/export declare const minter: ActorSubclass<_SERVICE>;//g' idl/index.d.ts > idl/index.tmp.d.ts
mv idl/index.tmp.d.ts idl/index.d.ts