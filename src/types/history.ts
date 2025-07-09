
export interface DonateHistoryItem {
  type: "donate";
  username: string | null;
  datetime: string;
  amount: number;
  wish_uuid: string;
  message: string | null;
}

export interface WithdrawHistoryItem {
  type: "withdraw";
  datetime: string;
  amount: number;
}

export type HistoryItem = DonateHistoryItem | WithdrawHistoryItem;

export interface HistoryResponse {
  page: number;
  history: HistoryItem[];
}

// Моковые
export const mockHistoryData: HistoryResponse = {
  page: 1,
  history: [
    {
      type: "donate",
      username: "BugCatcher",
      datetime: "2024-07-09T14:30:00+0300",
      amount: 10.1,
      wish_uuid: "0197ec91-c0ee-729e-a85f-0d421763b998",
      message: "Hey! Great stream, here's for coffee ☕"
    },
    {
      type: "donate",
      username: null,
      datetime: "2024-07-09T12:15:00+0300",
      amount: 25.5,
      wish_uuid: "0197ec91-c0ee-729e-a85f-0d421763b999",
      message: null
    },
    {
      type: "withdraw",
      datetime: "2024-07-08T18:45:00+0300",
      amount: 100.0
    },
    {
      type: "donate",
      username: "Streamer228",
      datetime: "2024-07-08T16:20:00+0300",
      amount: 5.0,
      wish_uuid: "0197ec91-c0ee-729e-a85f-0d421763b997",
      message: "Thanks for the content!"
    },
    {
      type: "donate",
      username: "MegaDonator",
      datetime: "2024-07-07T20:10:00+0300",
      amount: 50.0,
      wish_uuid: "0197ec91-c0ee-729e-a85f-0d421763b996",
      message: "Keep it up, best streamer!"
    }
  ]
};
