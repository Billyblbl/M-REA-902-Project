import React from 'react';
import { View, Text } from 'react-native';

type Props = {
    missingPermission: string[]
}

function MissingPermissionScreen({ missingPermission }: Props) {
  return (
    <View>
      <Text>
        {`Missing Permission${missingPermission.length > 1 ? 's' : ''}: ${missingPermission.join(', ')}`}
      </Text>
    </View>
  );
}

export default MissingPermissionScreen;
