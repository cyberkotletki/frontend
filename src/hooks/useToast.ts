interface ToastOptions {
  title: string;
  description?: string;
  type?: "success" | "error" | "info" | "warning";
}

export const useToast = () => {
  const addToast = (options: ToastOptions) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(options.title, {
        body: options.description,
        icon: "/logo.png",
      });
    }
  };

  return { addToast };
};
