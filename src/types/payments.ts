export type Payment = {
  uuid: string;
  paymentUserData: PaymentUserData;
  paymentInfo: PaymentInfo;
};

export type PaymentUserData = {
  userName: string;
  messageText: string;
};

export type PaymentInfo = {
  date: number;
  fromUUID: string;
  toUUID: string;
  wishUUID: string;
  toAddress: string;
  paymentType: PaymentType;
};

export enum PaymentType {
  Donate,
  Withdraw,
}
