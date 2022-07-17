import {FC} from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {NavigationStackParamList} from '../../navigation/navigation';

/**
 * Types
 */

type QuoteScreenProps = StackScreenProps<NavigationStackParamList, 'Quote'>;

const Quote: FC<QuoteScreenProps> = ({
  route: {
    params: {text},
  },
}) => {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default Quote;
