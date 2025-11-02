import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

function DetailCard() {
  const imageList = getImages();

  return (
    <ScrollView style={styles.container}>
      <Text>awnd</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        data={imageList}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.image} />
        )}
      />
    </ScrollView>
  );
}

export default DetailCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1500,
  },
  imageContainer: {
    width: '100%',
    height: 450,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: 450,
  },
});

function getImages() {
  return [
    { image: require('../../../assets/sample-profile2.jpg') },
    { image: require('../../../assets/sample-profile2.jpg') },
    { image: require('../../../assets/sample-profile2.jpg') },
    { image: require('../../../assets/sample-profile2.jpg') },
    { image: require('../../../assets/sample-profile2.jpg') },
  ];
}
