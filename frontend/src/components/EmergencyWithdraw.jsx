const EmergencyWithdraw = () => {
    const handleEmergencyWithdraw = () => {
      console.log("Emergency Withdraw");
      // Call emergencyWithdraw function here
    };
  
    return (
      <div>
        <h2>Emergency Withdraw</h2>
        <button onClick={handleEmergencyWithdraw}>Emergency Withdraw</button>
      </div>
    );
  };
  
  export default EmergencyWithdraw;
  