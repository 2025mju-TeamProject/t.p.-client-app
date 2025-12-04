import React, { useRef, useState, useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
} from 'react-native';

import RecommendCard from '../../components/profile/RecommendCard';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/Octicons';
import ROUTES from '../../constants/routes';
import HomeHeader from '../../components/common/HeaderHomeScreen';
import { getMatchingReportApi, getRecommandProfileApi, ProfileResponse } from '../../api/profile';
import { useAuth } from '../../context/AuthContext';
import { useLoading } from '../../context/LoadingContext';
import { AxiosError } from 'axios';
import { isApiError } from '../../api/auth';

function HomeScreen({ navigation }: any) {
  const { showLoading, hideLoading } = useLoading();
  const [userList, setUserList] = useState<ProfileResponse[]>([]);
  const [reportMap, setReportMap] = useState<Record<number, string>>({});
  const auth = useAuth();
  const pageRef = useRef<PagerView>(null);
  const [page, setPage] = useState<number>(0);
  const [hasAlarm, setHasAlarm] = useState(true);

  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      if (!auth.accessToken) return;

      showLoading();
      try {
        // 1) 추천 리스트 불러오기
        const users = await getRecommandProfileApi(auth.accessToken);
        setUserList(users);

        // 2) 각 유저별로 한줄평 API 호출 (병렬)
        const entries = await Promise.all(
          users.map(async (u) => {
            try {
              const report = await getMatchingReportApi(u.user_id, auth.accessToken!);
              return [u.user_id, report] as const;
            } catch (error) {
              if(isApiError(error)) {
                console.log(error.response);
              }
              return [u.user_id, '쿠피가 한 줄평을 불러오지 못했어요.'] as const;
            }
          }),
        );

        // 3) { [user_id]: report } 형태의 맵으로 변환
        setReportMap(Object.fromEntries(entries));
      } finally {
        hideLoading();
      }
    };

    fetchAll();
  }, [auth.accessToken]);

  return (
    <View style={styles.container}>

      <HomeHeader
        title="오늘 추천"
        subtitle="매일 오전 7시, 오후 7시에 소개해 드려요."
        onPressAlarm={() => navigation.navigate(ROUTES.ALARM)}
        hasAlarm={hasAlarm}
      />

        <PagerView
          ref={pageRef}
          style={styles.pager}
          initialPage={0}
          onPageSelected={e => setPage(e.nativeEvent.position)}
        >
          {userList.map(item => (
            <ScrollView
              key={item.user_id}
              style={styles.page}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >

              {/* 프로필 카드 */}
              <RecommendCard
                name={item.nickname}
                age={item.age}
                distance={item.location}
                job={item.job}
                hashtags={item.info.comman_hobbies}
                imagePath={item.profile_image}
                mbti={item.mbti}
                report={reportMap[item.user_id]}
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