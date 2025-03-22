import { useState } from "react";

const StakingForm = () => {
  const [amount, setAmount] = useState("");

  const handleStake = () => {
    console.log("Stake Amount:", amount);
    // Call stake function here
  };

  return (
    <div>
      <h2>Stake Tokens</h2>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Enter amount"
      />
      <button onClick={handleStake}>Stake</button>
    </div>
  );
};

export default StakingForm;
