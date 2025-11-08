import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import RecommendCard from '../../components/profile/RecommendCard';

function HomeScreen({navigation}: any) {
  const userList = getItems();

  return (
    <ScrollView style={styles.container}>
      {/* 오늘 추천 */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>오늘 추천</Text>
        <Text style={styles.subTitle}>
          매일 오전 7시, 오후 7시에 소개해 드려요.
        </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 25 }}
        data={userList}
        renderItem={({ item, index }) => (
          <RecommendCard
            name={item.name}
            age={item.age}
            distance={item.distance}
            job={item.job}
            hashtags={item.hashtags}
            imagePath={item.image}
            padding={index == userList.length - 1 ? 1 : 0}
            onPress={() => navigation.navigate('Detail')}
          />
        )}
      />
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    backgroundColor: '#fff',
  },
  header: {
    height: 132,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
  },
  profileTag: {
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    height: 60,
    textAlignVertical: 'bottom',
    color: 'black',
    fontSize: 28,
    fontFamily: 'S-Core Dream',
    fontWeight: 700,
    marginBottom: 3,
  },
  subTitle: {
    // 매일 08시, 19시에 소개해 드려요.
    textAlignVertical: 'bottom',
    color: '#9C9C9C',
    fontSize: 12,
    fontFamily: 'NanumSquareOTF',
    fontWeight: '700',
    lineHeight: 14,
    marginBottom: 20,
  },
});

function getItems() {
  return [
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
    },
  ];
}
