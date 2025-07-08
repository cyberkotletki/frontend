class Routes {
    home = () => '/' as const;

    addwish = () => '/addwish' as const;
    analysis = () => '/analysis' as const;
    donathistory = () => '/donathistory' as const;
    register = () => '/register' as const;
    settings = () => '/settings' as const;
    streamer = (id: string) => `/streamer/${id}` as const;
    wish = (id: string) => `/wish/${id}` as const;
    wishlist = (id: string) => `/wishlist/${id}` as const;
    withdrawal = () => '/withdrawal' as const;
}

export const routes = new Routes();

export  type RouteValues = ReturnType<Routes[keyof Routes]>;