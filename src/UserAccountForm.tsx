import React from 'react';
import { View, Button, TextInput } from 'react-native';

export default function UserAccountForm({ actionText, action } : {
  actionText : string,
  action : (email : string, passwd : string) => void
}) {
  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);

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
