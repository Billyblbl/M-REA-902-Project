import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet, View, Image, Text, Button, TextInput,
} from 'react-native';

// import FileSystem from 'react-native-filesystem';

import * as DB from 'firebase/database';
import * as Auth from 'firebase/auth';
import * as Storage from 'firebase/storage';
import Ressources from './rsrc';
import firebaseInstance from './src/firebase';

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
});

// let onValueInit = false;

// const ref = Storage.ref(firebaseInstance.storage, 'images/img.png');

/*
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
    </View>
  );
  secureTextEntry={true}
}

export default PizzaTranslator;
*/

export default function App() {
  const [user, setUser] = React.useState<Auth.User | null>(null);
  const [imageURL, setImageURL] = React.useState<string | null>(null);

  const UserCreationForm = () => {
    const [email, setEmail] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string | null>(null);

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputs}
          placeholder="your@email.here"
          onChangeText={(text) => setEmail(text)}
          defaultValue={email ?? ''}
        />
        <TextInput
          style={styles.textInputs}
          placeholder="********************"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button
          onPress={async () => {
            if (password != null && email != null) {
              setUser((await Auth.createUserWithEmailAndPassword(firebaseInstance.auth, email, password)).user);
            }
          }}
          title="Create account"
          disabled={password == null || email == null}
        />
      </View>
    );
  };

  // user creation & sign in might be similar enough that we could fuse them into one
  const UserSignInForm = () => {
    const [email, setEmail] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string | null>(null);

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputs}
          placeholder="your@email.here"
          onChangeText={(text) => setEmail(text)}
          defaultValue={email ?? ''}
        />
        <TextInput
          style={styles.textInputs}
          placeholder="********************"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button
          onPress={async () => {
            if (password != null && email != null) {
              setUser((await Auth.signInWithEmailAndPassword(firebaseInstance.auth, email, password)).user);
            }
          }}
          title="Sign in"
          disabled={password == null || email == null}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={imageURL ?? Ressources.images.placeholder} />
      <Text>test content</Text>
      <Button
        onPress={() => {
          const userWriteRef = DB.ref(firebaseInstance.db, `users/${user?.uid}`);
          DB.set(userWriteRef, { someTestData: Math.random().toString() });
        }}
        title="user test"
      />

      <UserCreationForm />
      <UserSignInForm />

      <Button
        onPress={async () => {
          Auth.signOut(firebaseInstance.auth);
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
          const url = await Storage.getDownloadURL(Storage.ref(firebaseInstance.storage, 'cat.png'));
          // console.log(`image URL got : ${url}`);
          setImageURL(url);
        }}
        title="Update Image"
      />
      <StatusBar />
    </View>
  );
}
