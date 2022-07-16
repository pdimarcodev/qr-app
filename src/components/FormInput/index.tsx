import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  Pressable,
  Keyboard,
} from 'react-native';
import {Control, Controller, Path} from 'react-hook-form';

import {ShowIf} from '../ShowIf';
import {Icon} from '../Icon';
import {styles} from './styles';

/**
 * Types
 */

interface IFormInput<ContentType> extends TextInputProps {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: {};
}

/**
 * FormInput
 */

export function FormInput<ContentType>({
  control,
  name,
  rules = {},
  ...props
}: IFormInput<ContentType>) {
  const isPassword = name.toLowerCase().includes('password');
  const [showPassword, setShowPassword] = useState(false);

  const onEyeIconPress = () => setShowPassword(state => !state);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: {value, onChange, onBlur},
        fieldState: {isDirty, error},
      }) => (
        <>
          <View style={styles.container}>
            <TextInput
              value={value as string}
              placeholderTextColor={styles.placeholder.color}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={Keyboard.dismiss}
              style={styles.input}
              secureTextEntry={isPassword && !showPassword}
              {...props}
            />
            <ShowIf condition={isPassword}>
              <Pressable
                style={styles.icon}
                hitSlop={5}
                onPress={onEyeIconPress}>
                {showPassword ? (
                  <Icon name="EyeOpen" size={20} />
                ) : (
                  <Icon name="EyeClosed" size={20} />
                )}
              </Pressable>
            </ShowIf>
            <ShowIf condition={isDirty}>
              <View style={styles.icon}>
                {!error ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name="Warning" size={20} />
                )}
              </View>
            </ShowIf>
          </View>
          <View style={styles.errorWrapper}>
            <ShowIf condition={!!error}>
              <Text style={styles.errorMessage}>
                {error?.message || 'Error'}
              </Text>
            </ShowIf>
          </View>
        </>
      )}
    />
  );
}
