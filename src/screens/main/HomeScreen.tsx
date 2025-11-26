import React, { useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RecommendCard from '../../components/profile/RecommendCard';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/Octicons';
import ROUTES from '../../constants/routes';
import { Image } from 'react-native';
import HeaderHomeScreen from '../../components/common/HeaderHomeScreen';


function HomeScreen({ navigation }: any) {
  const userList = getItems();
  const pageRef = useRef<PagerView>(null);
  const [page, setPage] = useState<number>(0);

  const [pressed, setPressed] = useState(false);

  const totalPages = userList.length;

  return (
    <View style={styles.container}>

      <HeaderHomeScreen
        title="오늘 추천"
        subtitle="매일 오전 7시, 오후 7시에 소개해 드려요."
        onPressAlarm={() => navigation.navigate(ROUTES.ALARM)}
        pressed={pressed}
      />

      <PagerView
        ref={pageRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        {userList.map(item => (
          <ScrollView
            key={item.userId}
            style={styles.page}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <RecommendCard
              name={item.name}
              age={item.age}
              distance={item.distance}
              job={item.job}
              hashtags={item.hashtags}
              imagePath={item.image}
              onPress={() => navigation.navigate('Detail')}
            />
          </ScrollView>
        ))}
      </PagerView>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 132,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
  },
  profileTag: {
    color: '#666',
    marginTop: 4,
  },
  titleSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  title: {
    color: '#111',
    fontSize: 28,
    fontFamily: 'S-Core Dream',
    fontWeight: 700,
  },
  subTitle: {
    textAlignVertical: 'bottom',
    color: '#9C9C9C',
    fontSize: 12,
    fontFamily: 'NanumSquareOTF',
    fontWeight: '700',
    lineHeight: 14,
    marginBottom: 20,
  },
  alarmIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 24,
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
      userId: 0,
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
      userId: 1,
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
      userId: 2,
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
      userId: 3,
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
      userId: 4,
    },
    {
      name: '감자맛탕',
      age: 29,
      distance: '경기도 (1km)',
      job: '회사원',
      hashtags: ['커피', 'INTP', '헬스', '카페'],
      image: '../../assets/sample-profile2.jpg',
      userId: 5,
    },
  ];
}
