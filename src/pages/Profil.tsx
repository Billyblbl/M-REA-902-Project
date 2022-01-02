import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { useStore } from 'react-redux';
import Gallery from '../components/Gallery';
import StylizedButton from '../components/StylizedButton';
import { createUser, User } from '../types/user';
import { NavigationParams } from './NavigationParams';
import FirebaseInstance from '../FirebaseInstance';

const placeholderGallery = [
  { user: { email: 'pap', profilePictureURI: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }, pictureURI: 'https://www.grenier-alpin.com/blog/wp-content/uploads/2017/05/parapente-montagne.jpg' },
  { user: { email: 'pytp', profilePictureURI: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }, pictureURI: 'https://www.grenier-alpin.com/blog/wp-content/uploads/2017/05/parapente-montagne.jpg' },
  { user: { email: 'pop', profilePictureURI: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }, pictureURI: 'https://www.grenier-alpin.com/blog/wp-content/uploads/2017/05/parapente-montagne.jpg' },
  { user: { email: 'pap', profilePictureURI: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }, pictureURI: 'https://www.grenier-alpin.com/blog/wp-content/uploads/2017/05/parapente-montagne.jpg' },
  { user: { email: 'pytp', profilePictureURI: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }, pictureURI: 'https://www.grenier-alpin.com/blog/wp-content/uploads/2017/05/parapente-montagne.jpg' },
  { user: { email: 'pop', profilePictureURI: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }, pictureURI: 'https://www.grenier-alpin.com/blog/wp-content/uploads/2017/05/parapente-montagne.jpg' },
  { user: { email: 'pap', profilePictureURI: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }, pictureURI: 'https://www.grenier-alpin.com/blog/wp-content/uploads/2017/05/parapente-montagne.jpg' },
  { user: { email: 'pytp', profilePictureURI: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }, pictureURI: 'https://www.grenier-alpin.com/blog/wp-content/uploads/2017/05/parapente-montagne.jpg' },
];

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

type Props = BottomTabNavigationProp<NavigationParams, 'Profil'>

function Profil() {
  const navigation = useNavigation<Props>();
  const store = useStore<{ value: User }>();
  const [user, setUser] = useState(store.getState().value);

  store.subscribe(() => {
    setUser(store.getState().value);
  });

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: 'https://media.discordapp.net/attachments/243832219947368448/926989176879054888/20220102_010400.jpg?width=682&height=910' }}
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
      <Gallery data={placeholderGallery} onItemClick={undefined} />
    </View>
  );
}

export default Profil;
