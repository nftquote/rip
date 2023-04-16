use candid::Principal;
use ic_cdk::api::caller;
use ic_cdk::export::candid::{candid_method, export_service};
use ic_cdk_macros::{init, post_upgrade, pre_upgrade, query, update};

// #[ic_cdk_macros::query]
#[query]
fn greet(name: String) -> String {
    format!("Hello, {}!, {}", name, caller())
}
