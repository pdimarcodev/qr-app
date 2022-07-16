import {FC} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View} from 'react-native';
import {Text} from 'react-native';
import {NavigationStackParamList} from '../../navigation/navigation';

/**
 * Types
 */

type QRScanScreenProps = StackScreenProps<NavigationStackParamList, 'QRScan'>;

/**
 * QR Scan Screen
 */

const QRScan: FC<QRScanScreenProps> = ({navigation: {navigate}}) => {
  return (
    <View>
      <Text>QR</Text>
    </View>
  );
};

export default QRScan;
