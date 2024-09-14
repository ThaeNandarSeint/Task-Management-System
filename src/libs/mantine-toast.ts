import { NotificationData, notifications } from "@mantine/notifications";

export const toast = {
  show(opts: NotificationData) {
    notifications.show(opts);
  },
  success(opt: NotificationData) {
    this.show({
      color: "green",
      ...opt,
    });
  },

  error(opt: NotificationData) {
    this.show({
      color: "red",
      ...opt,
    });
  },
};
