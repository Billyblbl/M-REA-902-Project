import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import {
  View, TextInput, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { useStore } from 'react-redux';
import StylizedButton from '../components/StylizedButton';
import FirebaseInstance from '../FirebaseInstance';
import { createUser, User } from '../types/user';
import { NavigationParams } from './NavigationParams';

type Props = BottomTabNavigationProp<NavigationParams, 'Auth'>

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
});

function Auth() {
  const navigation = useNavigation<Props>();
  const store = useStore<{value: User}>();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Adresse email"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <StylizedButton
          onPress={async () => {
            try {
              const user = createUser();
              user.id = (await signInWithEmailAndPassword(
                FirebaseInstance.auth,
                email,
                password,
              )).user.uid;
              user.email = email;
              store.dispatch({ type: 'user/set', payload: user });
              console.log('signed into account');
            } catch (error) {
              alert(error);
            }
            navigation.goBack();
          }}
          title="Se connecter"
        />
        <StylizedButton
          onPress={async () => {
            try {
              const user = createUser();
              user.id = (await createUserWithEmailAndPassword(
                FirebaseInstance.auth,
                email,
                password,
              )).user.uid;
              user.email = email;
              store.dispatch({ type: 'user/set', payload: user });
              console.log('created account');
            } catch (error) {
              alert(error);
            }
            navigation.goBack();
          }}
          title="Créer un compte"
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textButton}>Continuer sans connexion</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Auth;
