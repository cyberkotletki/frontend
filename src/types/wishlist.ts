export interface Wish {
  uuid: string;
  wish_url: string | null;
  name: string;
  description: string | null;
  image: string;
  pol_target: number;
  pol_amount: number;
  is_priority: boolean;
}

export interface WishlistResponse {
  wishes: Wish[];
}

export interface CreateWishRequest {
  wish_url?: string;
  name: string;
  description?: string;
  image: string;
  pol_target: number;
  is_priority: boolean;
}

export interface CreateWishResponse {
  wish_uuid: string;
}

export const mockWishlistData: WishlistResponse = {
  wishes: [
    {
      uuid: "0197ec91-c0ee-729e-a85f-0d421763b998",
      wish_url: "https://ozon.com/gaming-headset",
      name: "Gaming Headset Pro",
      description: "High-quality gaming headset with surround sound",
      image: "https://donly.one/api/static/1",
      pol_target: 1.5,
      pol_amount: 0.9,
      is_priority: true,
    },
    {
      uuid: "0197ec91-c0ee-729e-a85f-0d421763b999",
      wish_url: "https://amazon.com/mechanical-keyboard",
      name: "Mechanical Keyboard RGB",
      description: "Professional mechanical keyboard with RGB lighting",
      image: "https://donly.one/api/static/2",
      pol_target: 2.0,
      pol_amount: 0.4,
      is_priority: false,
    },
    {
      uuid: "0197ec91-c0ee-729e-a85f-0d421763b996",
      wish_url: null,
      name: "New Monitor 4K",
      description: null,
      image: "https://donly.one/api/static/3",
      pol_target: 5.0,
      pol_amount: 3.2,
      is_priority: true,
    },
    {
      uuid: "0197ec91-c0ee-729e-a85f-0d421763b997",
      wish_url: "https://store.com/webcam",
      name: "Streaming Webcam HD",
      description: "Professional webcam for streaming and video calls",
      image: "https://donly.one/api/static/4",
      pol_target: 0.8,
      pol_amount: 0.8,
      is_priority: false,
    },
  ],
};
