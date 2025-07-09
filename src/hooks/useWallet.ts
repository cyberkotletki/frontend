import { useEffect, useState } from "react";

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

  return { isConnected, address };
}
