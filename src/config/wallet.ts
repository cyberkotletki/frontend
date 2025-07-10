import { AppKitNetwork, defineChain } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

import { ethersAdapter, projectId, metadata } from "./site";

export type WalletConfiguration = {
  net: AppKitNetwork;
  chainId: number;
}


const net = (): AppKitNetwork => {
  const url = import.meta.env.VITE_NETWORK_TESTNET_URL;
  const chainID = import.meta.env.VITE_NETWORK_CHAIN_ID;
  const networkName = import.meta.env.VITE_NETWORK_NAME;
  const blockExplorerURL = import.meta.env.VITE_NETWORK_EXPLORER_URL;


  if (!url || !chainID || !networkName || !blockExplorerURL) {
    throw new Error("TESTNET_URL is not defined");
  }

  return defineChain({
    id: parseInt(chainID),
    name: networkName,
    caipNetworkId: `eip155:${chainID}`,
    chainNamespace: "eip155",
    nativeCurrency: {
      decimals: 18,
      name: "Polygon",
      symbol: "POL",
    },
    rpcUrls: {
      default: {
        http: [url],
      },
    },
    blockExplorers: {
      default: { name: "Explorer", url: blockExplorerURL },
    },
  }) as AppKitNetwork;
};



export const modal = createAppKit({
  adapters: [ethersAdapter],
  networks: [net()],
  metadata,
  projectId,
  themeMode: "dark",
  features: {
    analytics: true,
  },
  themeVariables: {
    "--w3m-accent": "#000000",
  },
});


