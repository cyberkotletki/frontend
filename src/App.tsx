import { createAppKit } from '@reown/appkit/react'
import { networks, projectId, metadata, ethersAdapter } from './config'
import { ActionButtonList } from './components/wallet_components/ActionButtonList.tsx'
import { SmartContractActionButtonList } from './components/wallet_components/SmartContractActionButtonList.tsx'
import { InfoList } from './components/wallet_components/InfoList.tsx'
import { useState } from 'react'

import "./App.css"
import Container from "./components/Container.tsx";

// Create a AppKit instance
createAppKit({
  adapters: [ethersAdapter],
  networks,
  metadata,
  projectId,
  themeMode: 'dark',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#7272FD',
  }
})

export function App() {
  const [transactionHash, setTransactionHash] = useState('');
  const [signedMsg, setSignedMsg] = useState('');
  const [balance, setBalance] = useState('');


  const receiveHash = (hash: string) => {
    setTransactionHash(hash); // Update the state with the transaction hash
  };

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg); // Update the state with the transaction hash
  };

  const receivebalance = (balance: string) => {
    setBalance(balance)
  }

  return (
      <Container>
        <div className={"pages w-full"}>
          <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
          <h1>AppKit ethers React dApp Example</h1>
              <appkit-button />
              <ActionButtonList sendHash={receiveHash} sendSignMsg={receiveSignedMsg} sendBalance={receivebalance}/>
              <SmartContractActionButtonList />
              <div className="advice">
                <p>
                  This projectId only works on localhost. <br/>
                  Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
                </p>
              </div>
              <InfoList hash={transactionHash} signedMsg={signedMsg} balance={balance}/>
        </div>
      </Container>
  )
}

export default App
