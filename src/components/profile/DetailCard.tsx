import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import ProfileTag from '../../components/profile/ProfileTag';


const windowWidth = Dimensions.get('window').width;

function DetailCard() {
  const imageList = getImages();


  return (
    <ScrollView style={styles.container}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        data={imageList}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.image} />
        )}
      />

      <View style={styles.section}>
        <ProfileTag text={'궁합점수 80점'} />
        <ProfileTag text={'IT 개발직'} />
      </View>
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
    width: windowWidth,
    height: 450,
  },
  section: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 24,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
