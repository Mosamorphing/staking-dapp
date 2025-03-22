const RewardsClaim = () => {
    const handleClaim = () => {
      console.log("Claim rewards");
      // Call claim rewards function here
    };
  
    return (
      <div>
        <h2>Claim Rewards</h2>
        <button onClick={handleClaim}>Claim Rewards</button>
      </div>
    );
  };
  
  export default RewardsClaim;
  