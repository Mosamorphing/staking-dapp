// src/App.jsx
import React from "react";
import ConnectWallet from "./components/ConnectWallet.jsx";
import StakingForm from "./components/StakingForm.jsx";
import Withdraw from "./components/Withdraw.jsx";
import RewardsClaim from "./components/RewardsClaim";
import EmergencyWithdraw from "./components/EmergencyWithdraw";
import StakePositions from "./components/StakePositions";
import { WagmiProvider } from 'wagmi'
import { config } from "../utils/config.js";

function App() {
  return (
    <WagmiProvider config={config}>
    <div>
      <h1>Staking DApp</h1>
      <ConnectWallet />
      <StakingForm />
      <Withdraw />
      <RewardsClaim />
      <EmergencyWithdraw />
      <StakePositions />
    </div>
    </WagmiProvider>
  );
}

export default App;
