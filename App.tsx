import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onValue, ref } from 'firebase/database';
import React from 'react';
import { Provider, useStore } from 'react-redux';
import { Image, ImageSourcePropType } from 'react-native';
import FirebaseInstance from './src/FirebaseInstance';
import userStore from './src/global-state/stores';
import Auth from './src/pages/Auth';
import Home from './src/pages/Home';
import { NavigationParams, RootNavigationParams } from './src/pages/NavigationParams';
import Photo from './src/pages/Photo';
import Profil from './src/pages/Profil';
import { User } from './src/types/user';
import HomeIc from './assets/home_focused.png';
import PhotoIc from './assets/photo.png';
import ProfileIc from './assets/account.png';

const bottomNav = createBottomTabNavigator<NavigationParams>();
const root = createNativeStackNavigator <RootNavigationParams>();

interface UnknownNavigation {
  navigate(dest: string): void
}

function authRedirection(navigation: UnknownNavigation, isAuth : boolean) {
  if (!isAuth) { navigation.navigate('Auth'); }
}

function getTabBarIcon(focused: boolean, color: string, size: number, icon: ImageSourcePropType) {
  return (
    <Image
      source={{ uri: Image.resolveAssetSource(icon).uri }}
      style={{
        width: size,
        height: size,
        borderRadius: size,
        tintColor: color,
      }}
    />
  );
}

function BottomNav() {
  const store = useStore<{value: User}>();

  const user = store.getState().value;
  const userRef = ref(FirebaseInstance.db, `users/${user.id}`);
  onValue(userRef, async (snapshot) => store.dispatch({ type: 'user/imgs', payload: await FirebaseInstance.onUserValueChange(snapshot) }));

  return (
    <bottomNav.Navigator initialRouteName="Home">
      <bottomNav.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon(focused, color, size, HomeIc),
        }}
      />
      <bottomNav.Screen
        name="Photo"
        component={Photo}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon(focused, color, size, PhotoIc),
        }}
        listeners={({ navigation }) => ({ focus: () => authRedirection(navigation, store.getState().value.id !== '') })}
      />
      <bottomNav.Screen
        name="Profil"
        component={Profil}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon(focused, color, size, ProfileIc),
        }}
        listeners={({ navigation }) => ({ focus: () => authRedirection(navigation, store.getState().value.id !== '') })}
      />
      <bottomNav.Screen name="Auth" component={Auth} options={{ tabBarButton: () => null, tabBarLabel: undefined, headerShown: false }} />
    </bottomNav.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={userStore}>
      <NavigationContainer>
        <root.Navigator>
          <root.Screen name="BottomNav" component={BottomNav} options={{ title: 'My Tumblr' }} />
        </root.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
