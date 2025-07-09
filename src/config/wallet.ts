import { defineChain } from "@reown/appkit/networks";

export const testNetwork = defineChain({
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
      http: ["https://polygon-mainnet.infura.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://amoy.polygonscan.com" },
  },
});
