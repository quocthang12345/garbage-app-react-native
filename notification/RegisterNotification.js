import * as Notifications from 'expo-notifications';

const RegisterNotification = async () => {
      const { status }  = await Notifications.getPermissionsAsync();

      if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
      }

      

      const token = (await Notifications.getExpoPushTokenAsync()).data;

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      console.log(token)
      return token;
      
};

export default RegisterNotification;