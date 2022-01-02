import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import Gallery, { DataItem } from '../components/Gallery';
import FirebaseInstance from '../FirebaseInstance';
import { NavigationParams } from './NavigationParams';

type Props = BottomTabNavigationProp<NavigationParams, 'Home'>

function Home() {
  const [galleryDataset, setGalleryDataset] = useState<DataItem[]>([]);
  const navigation = useNavigation<Props>();

  const updateDataset = () => {
    FirebaseInstance.getAllImagesUrls()
      .then((urls) => {
        setGalleryDataset(urls.map((url): DataItem => ({ pictureURI: url })));
      });
  };

  navigation.addListener('focus', () => {
    updateDataset();
  });

  useEffect(() => {
    updateDataset();
  }, []);

  return (
    <View style={{}}>
      <Gallery data={galleryDataset} onItemClick={undefined} />
    </View>
  );
}

export default Home;
