import { useEffect } from "react";

type Props = {
  botName: string; // your bot's username without @
  onAuth: (user: TelegramUser) => void;
};

export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

export const TelegramLoginButton = ({ botName, onAuth }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-radius", "10");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.async = true;

    window.onTelegramAuth = (user: TelegramUser) => {
      onAuth(user);
    };

    document.getElementById("telegram-login-button")?.appendChild(script);

    return () => {
      delete window.onTelegramAuth;
    };
  }, [botName, onAuth]);

  return <div id="telegram-login-button" />;
};
