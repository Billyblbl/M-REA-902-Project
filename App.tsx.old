import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet, View, Image, Text, Button,
} from 'react-native';

import * as DB from 'firebase/database';
import * as Auth from 'firebase/auth';
import * as Storage from 'firebase/storage';
import FirebaseInstance from './src/FirebaseInstance';
import UserAccountForm from './src/UserAccountForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputs: {
    margin: '20dp',
    padding: '20dp',
  },
  testImage: {
    width: 100,
    height: 100,
  },
});

export default function App() {
  const [user, setUser] = React.useState<Auth.User | null>(null);
  const [imageURL, setImageURL] = React.useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageURL ?? 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg' }} style={styles.testImage} />
      <Text>test content</Text>
      <Button
        onPress={() => {
          const userWriteRef = DB.ref(FirebaseInstance.db, `users/${user?.uid}`);
          DB.set(userWriteRef, { someTestData: Math.random().toString() });
        }}
        title="user test"
      />

      <UserAccountForm
        actionText="Create account"
        action={async (email : string, passwd : string) => {
          setUser((
            await Auth.createUserWithEmailAndPassword(
              FirebaseInstance.auth,
              email,
              passwd,
            )).user);
        }}
      />

      <UserAccountForm
        actionText="Sign in"
        action={async (email : string, passwd : string) => {
          setUser((await Auth.signInWithEmailAndPassword(
            FirebaseInstance.auth,
            email,
            passwd,
          )).user);
        }}
      />

      <Button
        onPress={async () => {
          Auth.signOut(FirebaseInstance.auth);
          setUser(null);
        }}
        title="Sign out user"
      />
      <Button
        onPress={async () => {
          if (user != null) {
            Auth.deleteUser(user);
            setUser(null);
          }
        }}
        title="Delete user"
      />
      <Text>
        {'User : '}
        {user?.displayName}
        {'\n'}
        {user?.email}
        {'\n'}
        {user?.uid}
      </Text>
      <Button
        onPress={async () => {
          // console.log('Getting image URL');
          const url = await Storage.getDownloadURL(Storage.ref(FirebaseInstance.storage, 'cat.png'));
          console.log(`image URL got : ${url}`);
          setImageURL(url);
        }}
        title="Update Image"
      />
      <StatusBar />
    </View>
  );
}
