import { AsyncStorage, Alert } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'NOTIFICATION_KEY:FLASHCARDS';

const createDailyReminder = () => ({
  title: `👋 Don't forget to take your daily quiz!`,
  body: `Remember practice make perfect. Take your daily quiz right now!`,
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
});

export const clearLocalNotification = () =>
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );

export function setupLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              scheduleLocalNotification();
            } else {
              infoUserNotificationDisabled();
            }
          })
          .catch(error => alert(JSON.stringify(error.sourceURL)));
      }
    });
}

const scheduleLocalNotification = () => {
  Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.scheduleLocalNotificationAsync(createDailyReminder(), {
    time: getNextDayTime(),
    repeat: 'day',
  });
  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
};

const infoUserNotificationDisabled = () => {
  const msg =
    "Seems that you don't granted permission to display notifications. To this app fully work, please, turn on notifications on your device settings.";
  const btns = [{ text: 'OK' }];
  Alert.alert('Notifications disabled', msg, btns);
};

const getNextDayTime = () => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(8);
  tomorrow.setMinutes(0);
  return tomorrow;
};
