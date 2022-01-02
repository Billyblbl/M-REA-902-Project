import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View, Image, StyleSheet,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { useStore } from 'react-redux';
import MissingPermissionScreen from '../components/MissingPermissionScreen';
import { NavigationParams } from './NavigationParams';
import FirebaseInstance from '../FirebaseInstance';
import { User } from '../types/user';
import StylizedButton from '../components/StylizedButton';

type Props = BottomTabNavigationProp<NavigationParams, 'Photo'>

const styles = StyleSheet.create({
  previewPicture: { width: '100%', flex: 2 },
  buttonContainer: { flexDirection: 'row', padding: 10, justifyContent: 'center' },
  takePictureButton: { marginRight: 15 },
});

function Photo() {
  const [camPermStatus, camPermRequestPermission] = ImagePicker.useCameraPermissions();
  const [previewPicture, setPreviewPicture] = useState<{uri: string}>();
  const navigation = useNavigation<Props>();
  const store = useStore<{value: User}>();
  const user = store.getState().value;

  if (!camPermStatus) {
    camPermRequestPermission();
    return (
      <MissingPermissionScreen missingPermission={['Camera']} />
    );
  }

  const takePicture = async () => {
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (res.cancelled) return;

    setPreviewPicture(res);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: previewPicture?.uri }} style={styles.previewPicture} />
      <View style={styles.buttonContainer}>
        <StylizedButton
          onPress={() => { takePicture(); }}
          style={styles.takePictureButton}
          title="Take picture"
        />
        <StylizedButton
          title="Validate Picture"
          disabled={!previewPicture}
          onPress={async () => {
          // TODO replace placeholder empty string with some form of error
            setPreviewPicture(undefined);
            const path = await FirebaseInstance.uploadFileToPath(previewPicture?.uri ?? '', `images/${uuid.v4().toString()}`);
            await FirebaseInstance.addFileToUser(user.id, path);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

export default Photo;
