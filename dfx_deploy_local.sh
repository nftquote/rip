#!/bin/sh

./dfx_generate_idl.sh
cd web && npm run build && cd ..
dfx deploy --no-wallet --network local
