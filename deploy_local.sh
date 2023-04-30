#!/bin/sh

cd web && npm run build && cd ..
dfx deploy --no-wallet --network local
