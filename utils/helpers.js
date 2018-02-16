import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';
import { Dimensions } from 'react-native';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
const createNotification = () => {
  return {
    title: 'Time to study!',
    body: "👋 don't forget study!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
};
export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let scheduleDate = new Date();
            scheduleDate.setMinutes(scheduleDate.getMinutes() + 1);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: scheduleDate,
              repeat: 'day'
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};

//https://shellmonger.com/2017/07/26/handling-orientation-changes-in-react-native/
/**
 *
 * @param {ScaledSize} dim the dimensions object
 * @param {*} limit the limit on the scaled dimension
 */
const msp = (dim, limit) => {
  return dim.scale * dim.width >= limit || dim.scale * dim.height >= limit;
};

/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

/**
 * Returns true of the screen is in landscape mode
 */
export const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

/**
 * Returns true if the device is a tablet
 */
export const isTablet = () => {
  const dim = Dimensions.get('screen');
  return (
    (dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900))
  );
};

/**
 * Returns true if the device is a phone
 */
export const isPhone = () => {
  return !isTablet();
};
