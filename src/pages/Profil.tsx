import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { useStore } from 'react-redux';
import Gallery, { DataItem } from '../components/Gallery';
import StylizedButton from '../components/StylizedButton';
import { createUser, User } from '../types/user';
import { NavigationParams } from './NavigationParams';
import FirebaseInstance from '../FirebaseInstance';
import ProfileIc from '../../assets/account.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imgContainer: {
    marginVertical: 15,
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  infoProfileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonProfile: {
    marginTop: 15,
    width: '30%',
  },
});

const defaultProfilePicture = Image.resolveAssetSource(ProfileIc).uri;

type Props = BottomTabNavigationProp<NavigationParams, 'Profil'>

function Profil() {
  const navigation = useNavigation<Props>();
  const store = useStore<{ value: User }>();
  const [user, setUser] = useState(store.getState().value);

  store.subscribe(() => {
    setUser(store.getState().value);
  });

  const galleryDataset = user.imgs.urls.map((it): DataItem => (
    { pictureURI: it.url, picturePath: it.path }));

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: user.imgs.profileUrl?.url ?? defaultProfilePicture }}
          style={styles.img}
        />
      </View>
      <Text style={styles.infoProfileText}>{user.email}</Text>
      <StylizedButton
        style={styles.buttonProfile}
        onPress={() => {
          signOut(getAuth(FirebaseInstance.app));
          store.dispatch({ type: 'user/set', payload: createUser() });
          navigation.navigate('Auth');
        }}
        title="Déconnexion"
      />
      <View style={{ flex: 3 }}>

        <Gallery
          data={galleryDataset}
          onItemClick={(it) => {
            FirebaseInstance.addProfileImage(user.id, it.picturePath ?? '');
          }}
        />
      </View>
    </View>
  );
}

export default Profil;
