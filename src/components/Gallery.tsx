import React from 'react';
import {
  FlatList, Image, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DataItem = { pictureURI: string }

type Props = {
    data: DataItem[],
    onItemClick?: (it: DataItem) => void
}

function Gallery({ data, onItemClick }: Props) {
  return (
    <SafeAreaView>
      <FlatList
        style={{ width: '100%', height: '100%', paddingHorizontal: 10 }}
        data={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => onItemClick?.(item)}>
            <Image source={{ uri: item.pictureURI }} resizeMode="contain" style={{ height: undefined, width: '100%', aspectRatio: 135 / 76 }} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

Gallery.defaultProps = {
  onItemClick: undefined,
};

export type { DataItem };
export default Gallery;
