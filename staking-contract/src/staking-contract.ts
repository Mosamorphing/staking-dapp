import {
  Staked,
  Withdrawn,
  RewardsClaimed,
  RewardRateUpdated,
  EmergencyWithdrawn,
} from "../generated/StakingContract/StakingContract";
import {
  User,
  StakePosition,
  Withdrawal,
  Reward,
  ProtocolMetrics,
} from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

// Helper function to load or create a User entity
function getUser(id: string): User {
  let user = User.load(id);
  if (!user) {
    user = new User(id);
    user.totalStaked = BigInt.fromI32(0);
    user.totalRewards = BigInt.fromI32(0);
    user.save();
  }
  return user;
}

// Helper function to load or create ProtocolMetrics entity
function getProtocolMetrics(): ProtocolMetrics {
  let metrics = ProtocolMetrics.load("global");
  if (!metrics) {
    metrics = new ProtocolMetrics("global");
    metrics.totalStaked = BigInt.fromI32(0);
    metrics.currentRewardRate = BigInt.fromI32(0);
    metrics.lastUpdated = BigInt.fromI32(0);
    metrics.save();
  }
  return metrics;
}

// Event: Staked
export function handleStaked(event: Staked): void {
  let user = getUser(event.params.user.toHex());
  let stake = new StakePosition(event.transaction.hash.toHex());

  stake.user = user.id;
  stake.amount = event.params.amount;
  stake.stakedAt = event.block.timestamp;
  // stake.unlockTime = event.params.unlockTime;
  stake.save();

  user.totalStaked = user.totalStaked.plus(event.params.amount);
  user.save();

  let metrics = getProtocolMetrics();
  metrics.totalStaked = metrics.totalStaked.plus(event.params.amount);
  metrics.lastUpdated = event.block.timestamp;
  metrics.save();
}

// Event: Withdrawn
export function handleWithdrawn(event: Withdrawn): void {
  let user = getUser(event.params.user.toHex());
  let withdrawal = new Withdrawal(event.transaction.hash.toHex());

  withdrawal.user = user.id;
  withdrawal.amount = event.params.amount;
  withdrawal.withdrawnAt = event.block.timestamp;
  withdrawal.save();

  user.totalStaked = user.totalStaked.minus(event.params.amount);
  user.save();

  let metrics = getProtocolMetrics();
  metrics.totalStaked = metrics.totalStaked.minus(event.params.amount);
  metrics.lastUpdated = event.block.timestamp;
  metrics.save();
}

// Event: RewardsClaimed
export function handleRewardsClaimed(event: RewardsClaimed): void {
  let user = getUser(event.params.user.toHex());
  let reward = new Reward(event.transaction.hash.toHex());

  reward.user = user.id;
  reward.amount = event.params.amount;
  reward.claimedAt = event.block.timestamp;
  reward.save();

  user.totalRewards = user.totalRewards.plus(event.params.amount);
  user.save();
}

// Event: RewardRateUpdated
export function handleRewardRateUpdated(event: RewardRateUpdated): void {
  let metrics = getProtocolMetrics();
  metrics.currentRewardRate = event.params.newRate;
  metrics.lastUpdated = event.block.timestamp;
  metrics.save();
}

// Event: EmergencyWithdrawn
export function handleEmergencyWithdrawn(event: EmergencyWithdrawn): void {
  let user = getUser(event.params.user.toHex());
  let withdrawal = new Withdrawal(event.transaction.hash.toHex());

  withdrawal.user = user.id;
  withdrawal.amount = event.params.amount;
  withdrawal.withdrawnAt = event.block.timestamp;
  withdrawal.save();

  user.totalStaked = user.totalStaked.minus(event.params.amount);
  user.save();

  let metrics = getProtocolMetrics();
  metrics.totalStaked = metrics.totalStaked.minus(event.params.amount);
  metrics.lastUpdated = event.block.timestamp;
  metrics.save();
}