import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  StakingContract,
  EmergencyWithdrawn,
  OwnershipTransferred,
  Paused,
  RewardRateUpdated,
  RewardsClaimed,
  Staked,
  StakingInitialized,
  StakingPaused,
  StakingUnpaused,
  TokenRecovered,
  Unpaused,
  Withdrawn
} from "../generated/StakingContract/StakingContract"
import { ExampleEntity } from "../generated/schema"

export function handleEmergencyWithdrawn(event: EmergencyWithdrawn): void {
  // Entities can be loaded from the store using an ID; this ID
  // needs to be unique across all entities of the same type
  const id = event.transaction.hash.concat(
    Bytes.fromByteArray(Bytes.fromBigInt(event.logIndex))
  )
  let entity = ExampleEntity.load(id)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(id)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.user = event.params.user
  entity.amount = event.params.amount

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.PRECISION(...)
  // - contract.REWARDS_PER_MINUTE_PRECISION(...)
  // - contract.aprReductionPerThousand(...)
  // - contract.currentRewardRate(...)
  // - contract.emergencyWithdrawPenalty(...)
  // - contract.getPendingRewards(...)
  // - contract.getTimeUntilUnlock(...)
  // - contract.getTotalRewards(...)
  // - contract.getUserDetails(...)
  // - contract.initialApr(...)
  // - contract.minLockDuration(...)
  // - contract.owner(...)
  // - contract.paused(...)
  // - contract.stakingToken(...)
  // - contract.totalStaked(...)
  // - contract.userInfo(...)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleRewardRateUpdated(event: RewardRateUpdated): void {}

export function handleRewardsClaimed(event: RewardsClaimed): void {}

export function handleStaked(event: Staked): void {}

export function handleStakingInitialized(event: StakingInitialized): void {}

export function handleStakingPaused(event: StakingPaused): void {}

export function handleStakingUnpaused(event: StakingUnpaused): void {}

export function handleTokenRecovered(event: TokenRecovered): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdrawn(event: Withdrawn): void {}
