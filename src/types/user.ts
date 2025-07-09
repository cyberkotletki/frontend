export type User = {
  uuid: string;
  polygon_wallet: string;
  name: string;
  topics: string[];
  banner: string;
  avatar: string;
  background_color: string;
  background_image: string;
  button_background_color: string;
  button_text_color: string;
  created_at: Date;
  updated_at: Date;
  telegram_id: string;
};

export type Topic = {
  emoji: string;
  text: string;
};

export const UserTopics: Topic[] = [
  { emoji: "🌱", text: "IRL" },
  { emoji: "🎮", text: "Gayming" },
  { emoji: "🎵", text: "Music" },
  { emoji: "🎙️", text: "ASMR" },
  { emoji: "🎨", text: "Creative" },
  { emoji: "🏆", text: "Esports" },
  { emoji: "🔞", text: "18+" },
  { emoji: "🦊", text: "Animals" },
  { emoji: "🌍", text: "Other" },
];

export const mockUsers: User[] = [
  {
    uuid: "2de3e0a4-8f76-4f7b-b71e-3c60e561fa91",
    polygon_wallet: "0x4B0897b0513fdc7C541B6d9D7E929C4e5364D2dB",
    name: "Alice Nakamoto",
    topics: ["DeFi", "ZK tech", "GameFi"],
    banner: "Early contributor to Polygon ZK stack",
    avatar: "https://example.com/avatar1.png",
    background_color: "#1f1f2e",
    background_image: "https://example.com/bg1.jpg",
    button_background_color: "#8247e5",
    button_text_color: "#ffffff",
    created_at: new Date("2024-12-01T10:15:00Z"),
    updated_at: new Date("2025-07-01T18:30:00Z"),
    telegram_id: "123456789",
  },
  {
    uuid: "3ba7fc83-5e15-41cd-9c89-daa1058db8f2",
    polygon_wallet: "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
    name: "Vitaly Shiba",
    topics: ["NFTs", "CryptoArt", "Web3 Identity"],
    banner: "Creator of 0xShiba DAO",
    avatar: "https://example.com/avatar2.png",
    background_color: "#0d0d0d",
    background_image: "https://example.com/bg2.jpg",
    button_background_color: "#ff0055",
    button_text_color: "#ffffff",
    created_at: new Date("2025-01-20T09:00:00Z"),
    updated_at: new Date("2025-06-25T12:45:00Z"),
    telegram_id: "987654321",
  },
  {
    uuid: "f94e3a77-5c1f-48e0-a6fa-e02b2f43d823",
    polygon_wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    name: "Liza Troon",
    topics: ["DAOs", "Decentralized Science", "Layer 2"],
    banner: "DAO researcher & speaker",
    avatar: "https://example.com/avatar3.png",
    background_color: "#14213d",
    background_image: "https://example.com/bg3.jpg",
    button_background_color: "#fca311",
    button_text_color: "#000000",
    created_at: new Date("2025-04-10T14:10:00Z"),
    updated_at: new Date("2025-07-01T11:20:00Z"),
    telegram_id: "555123456",
  },
];
