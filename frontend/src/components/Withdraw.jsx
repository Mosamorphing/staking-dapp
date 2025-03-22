const Withdraw = () => {
    const handleWithdraw = () => {
      console.log("Withdraw tokens");
      // Call withdraw function here
    };
  
    return (
      <div>
        <h2>Withdraw Tokens</h2>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    );
  };
  
  export default Withdraw;
  