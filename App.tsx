import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider, useStore } from 'react-redux';
import userStore from './src/global-state/stores';
import Auth from './src/pages/Auth';
import Home from './src/pages/Home';
import { NavigationParams, RootNavigationParams } from './src/pages/NavigationParams';
import Photo from './src/pages/Photo';
import Profil from './src/pages/Profil';
import { User } from './src/types/user';

const bottomNav = createBottomTabNavigator<NavigationParams>();
const root = createNativeStackNavigator <RootNavigationParams>();

function authRedirection(e: any, navigation: any, isAuth : boolean) {
  if (!isAuth) { navigation.navigate('Auth'); }
}

function BottomNav() {
  const store = useStore<{value: User}>();
  return (
    <bottomNav.Navigator initialRouteName="Home">
      <bottomNav.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <bottomNav.Screen
        name="Photo"
        component={Photo}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({ focus: (e) => authRedirection(e, navigation, store.getState().value.id !== '') })}
      />
      <bottomNav.Screen
        name="Profil"
        component={Profil}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({ focus: (e) => authRedirection(e, navigation, store.getState().value.id !== '') })}
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
          <root.Screen name="BottomNav" component={BottomNav} />
        </root.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
