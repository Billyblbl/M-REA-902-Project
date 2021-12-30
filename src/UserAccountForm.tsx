import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { userStore } from './global-state/stores';
import { User , createUser} from './types/user';

export default function UserAccountForm({ actionText, action } : {
  actionText : string,
  action : (email : string, passwd : string) => void
}) {
  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const user = createUser()

  user.username = "Alexandre le BG"
  user.email = "alexandre@bg.com"
  user.id = "Q4LOQ0c518gTH4KCNwcFeSX4ReR2"

  userStore.dispatch({type: "user", payload: user});
  console.log("fdsfdsjkgfdsgfdgfdkgjdfkgjkfdgjdfkgjfdklgjfslgkfgjls", userStore.getState());
  return (
    <View>
      <TextInput
        placeholder="your@email.here"
        onChangeText={(text) => setEmail(text)}
        defaultValue={email ?? ''}
      />
      <TextInput
        placeholder="********************"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        onPress={() => {
          if (password != null && email != null) action(email, password);
        }}
        title={actionText}
        disabled={password == null || email == null}
      />
    </View>
  );
}
