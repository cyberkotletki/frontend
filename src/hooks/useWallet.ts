import { useEffect, useState } from "react";
import { BrowserProvider, ethers, Eip1193Provider } from "ethers";
import { useAppKitProvider } from "@reown/appkit/react";

import { abi } from "@/contracts/Donates.json";
import modal from "@/config/wallet.ts";

export function useWalletConnectionState() {
  const [isConnected, setIsConnected] = useState(modal.getIsConnectedState());
  const [address, setAddress] = useState(modal.getAddress() ?? null);

  useEffect(() => {
    const check = () => {
      setIsConnected(modal.getIsConnectedState());
      setAddress(modal.getAddress() ?? null);
    };

    check();
    window.addEventListener("focus", check);
    const interval = setInterval(check, 2000);

    return () => {
      window.removeEventListener("focus", check);
      clearInterval(interval);
    };
  }, []);

  return { isConnected, address, modal };
}
//
// export const useGetContract = () => {
//   const { isConnected } = useWalletConnectionState();
//   const rpcUrl = import.meta.env.VITE_TESTNET_URL;
//
//   if (!isConnected || !rpcUrl) {
//     throw new Error("wallet not connected");
//   }
//   const { walletProvider } = useAppKitProvider("eip155");
//
//   const getContract = async (): Promise<ethers.Contract> => {
//     const ethersProvider = new BrowserProvider(<Eip1193Provider>walletProvider);
//     const signer = await ethersProvider.getSigner();
//
//     const address = import.meta.env.VITE_CONTRACT_ADDRESS;
//
//     return new ethers.Contract(address, abi, signer);
//   };
//
//   return { getContract };
// };

export const useGetContract = () => {
  const { walletProvider } = useAppKitProvider("eip155");

  const getContract = async (): Promise<ethers.Contract> => {
    const ethersProvider = new BrowserProvider(<Eip1193Provider>walletProvider);
    const signer = await ethersProvider.getSigner();

    const address = import.meta.env.VITE_CONTRACT_ADDRESS;

    if (!address) throw new Error("Missing contract address");

    return new ethers.Contract(address, abi, signer);
  };

  return { getContract };
};
