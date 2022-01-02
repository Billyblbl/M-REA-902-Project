import React from 'react';
import {
  FlatList, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DataItem = { pictureURI: string, picturePath?: string }

type Props = {
    data: DataItem[],
    onItemClick?: (it: DataItem) => void
}

const styles = StyleSheet.create({
  list: { width: '100%', paddingHorizontal: 10 },
  listItemContainer: { marginVertical: 10 },
  listItemPicture: { height: undefined, width: '100%', aspectRatio: 135 / 76 },
});

function Gallery({ data, onItemClick }: Props) {
  return (
    <SafeAreaView>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.pictureURI}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItemContainer} onPress={() => onItemClick?.(item)}>
            <Image source={{ uri: item.pictureURI }} resizeMode="contain" style={styles.listItemPicture} />
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
