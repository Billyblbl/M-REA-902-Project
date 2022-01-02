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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#303030',
    padding: 15,
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  textButton: {
    marginTop: '20%',
  },
  buttonText: {
    color: '#fff',
  },
});

type Props = BottomTabNavigationProp<NavigationParams, 'Photo'>

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
      <Image source={{ uri: previewPicture?.uri }} style={{ width: '100%', flex: 2 }} />
      <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center' }}>
        <StylizedButton
          onPress={() => { takePicture(); }}
          style={{ marginRight: 15 }}
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
            console.info(`The picture should be sent to ${path}`);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

export default Photo;
