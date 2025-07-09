class Routes {
  home = () => "/" as const;

  addwish = () => "/add-wish" as const;
  analysis = () => "/analysis" as const;
  donathistory = () => "/history" as const;
  register = () => "/register" as const;
  settings = () => "/settings" as const;
  wish = (id: string) => `/wish/${id}` as const;
  wishlist = (id: string) => `/wishlist/${id}` as const;
  withdrawal = () => "/withdrawal" as const;
  profile = () => "/profile" as const;
}

export const routes = new Routes();

export type RouteValues = ReturnType<Routes[keyof Routes]>;
