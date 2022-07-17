import {FC, useLayoutEffect} from 'react';
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
  const devices = useCameraDevices();
  const device = devices.back;

  const onBarCodeRead = (detectedBarcodes: Barcode[]): void => {
    const {data} = detectedBarcodes[0]?.content || '';

    if (data) {
      navigate('Quote', {text: data as string});
    }
    return;
  };

  const isCameraEnabled = async () => {
    const status = await Camera.getCameraPermissionStatus();

    return status === 'authorized';
  };

  const askCameraPermission = async (): Promise<void> => {
    await Camera.requestCameraPermission();
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
      checkInverted: true,
    });
    runOnJS(onBarCodeRead)(detectedBarcodes);
  }, []);

  useLayoutEffect(() => {
    if (!isCameraEnabled()) {
      askCameraPermission();
    }
  }, []);

  return device != null ? (
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
