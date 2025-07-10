export type WishDto = {
  userUUID: string;
  uuid: string;
  currentBalance: number;
  price: number;
  name: string;
  link: string;
  description: string | undefined;
  completed: boolean;
};
