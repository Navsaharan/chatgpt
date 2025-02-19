import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert } from 'react-native';

const TradeAlerts = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert("AI Trade Alert", remoteMessage.notification.body);
        });
        return unsubscribe;
    }, []);

    return null;
};

export default TradeAlerts;
