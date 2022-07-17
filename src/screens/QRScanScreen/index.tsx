import {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {BarcodeFormat, scanBarcodes, Barcode} from 'vision-camera-code-scanner';
import {runOnJS} from 'react-native-reanimated';

import {NavigationStackParamList} from '../../navigation/navigation';

/**
 * Types
 */

type QRScanScreenProps = StackScreenProps<NavigationStackParamList, 'QRScan'>;

/**
 * QR Scan Screen
 */

const QRScan: FC<QRScanScreenProps> = ({navigation: {navigate}}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const onBarCodeRead = (detectedBarcodes: Barcode[]): void => {
    const {
      content: {data},
    } = detectedBarcodes[0];

    navigate('Quote', {text: data as string});
  };

  const checkCameraPermission = async (): Promise<void> => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'authorized');
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
      checkInverted: true,
    });
    runOnJS(onBarCodeRead)(detectedBarcodes);
  }, []);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return device != null && hasPermission ? (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
    />
  ) : (
    <View>
      <Text>Please enable camera</Text>
    </View>
  );
};

export default QRScan;
