.PHONY: build up down clean

build:
	dfx canister create --all --no-wallet --network local
	./dfx_generate_idl.sh
	cd web && npm run build && cd -
	dfx build --all --network local
	dfx canister install --all --network local


up:
	dfx start --background --clean --host 127.0.0.1:8000
	make build
	dfx deploy

down:
	dfx stop

clean:
	make down
	rm -rf .dfx/ ./internet-identity/.dfx/