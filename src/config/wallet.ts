import { AppKitNetwork, defineChain } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

import { ethersAdapter, projectId, metadata } from "./site";

export const net = (): AppKitNetwork => {
  const url = import.meta.env.VITE_TESTNET_URL;

  if (!url) {
    throw new Error("TESTNET_URL is not defined");
  }

  return defineChain({
    id: 80002,
    name: "Amoy",
    caipNetworkId: "eip155:80002",
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
      default: { name: "Explorer", url: "https://amoy.polygonscan.com" },
    },
  }) as AppKitNetwork;
};

const modal = createAppKit({
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

export default modal;
