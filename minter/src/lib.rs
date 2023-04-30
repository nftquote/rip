use ic_cdk_macros;

#[ic_cdk_macros::query]
fn greet(name: String) -> String {
    let msg = format!("Hello {}, I am a RIP minting canister", name);

    msg
}
