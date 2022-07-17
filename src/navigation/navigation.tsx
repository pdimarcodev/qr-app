import {createStackNavigator} from '@react-navigation/stack';
import {Header} from '../components/Header';
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
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
      initialRouteName="Login">
      <Stack.Group
        screenOptions={{
          headerMode: 'screen',
          header: () => <Header />,
        }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="QRScan" component={QRScan} />
        <Stack.Screen name="Quote" component={Quote} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
