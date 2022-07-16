import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens';

/**
 * Types
 */

export type NavigationStackParamList = {
  Login: undefined;
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
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
