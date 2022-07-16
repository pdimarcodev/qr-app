import {FC, useState} from 'react';
import {Alert, Keyboard, Pressable, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useForm} from 'react-hook-form';
import * as Keychain from 'react-native-keychain';

import {NavigationStackParamList} from '../../navigation/navigation';
import {FormInput} from '../../components/FormInput';
import {styles} from './styles';
import {Button} from '../../components/Button';

/**
 * Types
 */

type LoginScreenProps = StackScreenProps<NavigationStackParamList, 'Login'>;

type LoginData = {
  username: string;
  password: string;
};

/**
 * Constants
 */

const DEFAULT_VALUES: LoginData = {
  username: '',
  password: '',
};

const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]*$/;
const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=.])\S{8,32}$/;

/**
 * Login Screen
 */

const Login: FC<LoginScreenProps> = ({navigation: {navigate}}) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {isDirty, isValid},
  } = useForm<LoginData>({mode: 'onChange', defaultValues: DEFAULT_VALUES});

  const onLoginPressed = async ({username, password}: LoginData) => {
    setLoading(true);

    try {
      await Keychain.setGenericPassword(username, password);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log({error});

      Alert.alert('Error', 'Something happened! Try again!');
    }
  };

  return (
    <>
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
        <View style={styles.formWrapper}>
          <FormInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{
              required: true,
              pattern: ALPHANUMERIC_REGEX,
            }}
          />
          <FormInput
            name="password"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            control={control}
            rules={{
              required: true,
              pattern: PASSWORD_REGEX,
            }}
          />
        </View>

        <Button
          accessibilityLabel="sign in"
          title="sign in"
          disabled={!isDirty || !isValid}
          loading={loading}
          onPress={handleSubmit(onLoginPressed)}
        />
      </Pressable>
    </>
  );
};

export default Login;
