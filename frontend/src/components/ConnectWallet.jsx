// ConnectWallet.jsx
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <div>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              disabled={!connector.ready}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading && connector.id === pendingConnector?.id && '...'}
            </button>
          ))}
          {error && <div>{error.message}</div>}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
