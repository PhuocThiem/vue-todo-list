import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification();

export const handleNotification = (condition, successMsg, errorMsg) => {
  if (condition) {
    notification.notify({
      type: "error",
      title: errorMsg,
    });
    return;
  }
  notification.notify({
    type: "success",
    title: successMsg,
  });
};
