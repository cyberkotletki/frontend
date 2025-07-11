interface ToastOptions {
  title: string;
  description?: string;
  type?: "success" | "error" | "info" | "warning";
}

export const useToast = () => {
  const addToast = (options: ToastOptions) => {
    console.log(`[${options.type || "info"}] ${options.title}`);
    if (options.description) {
      console.log(options.description);
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(options.title, {
        body: options.description,
        icon: "/logo.png",
      });
    }
  };

  return { addToast };
};
