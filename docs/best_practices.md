# NFT Best practices

### 1. Set a generous freezing threshold

`freezing_threshold` The default value is approximately 30 days, but for NFTs, developers should set the freezing_threshold to at least 90 days, preferably 180 days.

### 2. Make sure your canisters can be monitored

On the IC, the cycle balance of a canister is only visible to controllers. Since an NFT (collection) might outlive its creator, you should plan for monitoring by third parties. You can do this via implementing a simple query method as included in the DIP721 and EXT standards.

### 3. Use [canister timers](https://internetcomputer.org/docs/current/developer-docs/backend/periodic-tasks) rather than heartbeat.
Use of the heartbeat: A plain heartbeat without doing anything will cost ~0.055 T cycles/day. Instead, use canister timers — one-shot or periodic canister calls with specified minimum timeout or interval.

### 4. Profile canister

you can use the recently added performance counter API to profile your canisters even before going live

- [performance counter API](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
- [Production Computation and Storage Costs](https://internetcomputer.org/docs/current/developer-docs/production/computation-and-storage-costs)

### 5. Rust canister best practices

- best practices links
    1. [Effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html)
    2. [Joachim Breitner's](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister)

### 6. Implement mechanisms to backup and restore state

The IC itself does not yet support backup and restoration of the canister state, but it can be implemented in the canister itself

- [Distrikt backup plan](https://forum.dfinity.org/t/backup-restore-function-for-a-canister/12849/3)

### 7. Consider for storing the transaction history
> [link](https://internetcomputer.org/docs/current/developer-docs/use-cases/considerations-for-nft-devs/#consider-using-a-dedicated-service-for-storing-the-transaction-history)


### 8. economic sustainability 

Ideally, your canisters implement mechanisms to generate fees that the canisters can use to pay for their existence indefinitely.

- Stacking, or expiration date system.
- Or order time.


### 9. Think about governance
> The value proposition of most NFTs is their permanence and immutability.

e.g. by setting the blackhole canister as the only controller. As long as NFT canisters have their developers as controllers, users depend on the trustworthiness (and operational security) of the developers. 

1. Developers should therefore make the canisters immutable or manage the canisters with a DAO. 
    1. DAO 도입시, 부조금 / 슬픔, 기쁨 공유 거버넌스 프로세스
2. A middle ground are mechanisms like [Launchtrail](https://devpost.com/software/launch-trail) that make changes to a canister auditable.

Blackholing a canister has its issues as well. If there are bugs in the canister code or you’re using experimental system APIs that might get deprecated, later on, the canister might stop functioning.

[How to make Trust in Canister](https://internetcomputer.org/docs/current/concepts/trust-in-canisters)