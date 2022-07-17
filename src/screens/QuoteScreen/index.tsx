import {FC} from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {NavigationStackParamList} from '../../navigation/navigation';
import {Button} from '../../components/Button';
import {styles} from './styles';

/**
 * Types
 */

type QuoteScreenProps = StackScreenProps<NavigationStackParamList, 'Quote'>;

/**
 * Quote Screen
 */

const Quote: FC<QuoteScreenProps> = ({
  route: {
    params: {text},
  },
  navigation: {reset},
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Button
        accessibilityLabel="scan again"
        title="scan again"
        onPress={() =>
          reset({
            index: 0,
            routes: [
              {
                name: 'QRScan',
              },
            ],
          })
        }
      />
    </View>
  );
};

export default Quote;
