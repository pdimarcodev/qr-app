import {createStackNavigator} from '@react-navigation/stack';
import {Login, QRScan, Quote} from '../screens';

/**
 * Types
 */

export type NavigationStackParamList = {
  Login: undefined;
  QRScan: undefined;
  Quote: {
    text: string;
  };
};

const Stack = createStackNavigator();

/**
 * Navigator
 */

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
      initialRouteName="QRScan">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="QRScan" component={QRScan} />
      <Stack.Screen name="Quote" component={Quote} />
    </Stack.Navigator>
  );
};
