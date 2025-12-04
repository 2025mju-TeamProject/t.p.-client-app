import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import ProfileTag from '../../components/profile/ProfileTag';
import colors from '../../constants/colors';
import { DetailProfileResponse, getUserProfileApi, ProfileResponse } from '../../api/profile';
import { useLoading } from '../../context/LoadingContext';
import { isApiError } from '../../api/auth';
import PagerView from 'react-native-pager-view';

const windowWidth = Dimensions.get('window').width;

type Props = {
  profile: ProfileResponse;
  report: string;
}

function DetailCard({ profile, report }: Props) {
  const { showLoading, hideLoading } = useLoading();
  const [detail, setDetail] = useState<DetailProfileResponse>();
  const [imageList, setImageList] = useState<string[]>([]);
  const pageRef = useRef<PagerView>(null);
  const [page, setPage] = useState<number>(0);

  function addEmoji(item: string, defaultEmoji = '⭐'): string {
    // 이미 앞에 이모지가 있는 경우 그대로 반환
    if (/^[\p{Emoji}]/u.test(item)) return item;

    // 매핑된 이모지가 있으면 붙이고, 없으면 기본 이모지 사용
    const clean = item.trim(); // 안전하게 trim
    const emoji = emojiMap[clean] ?? defaultEmoji;

    return `${emoji} ${clean}`;
  }

  useEffect(() => {
    async function getProfile() {
      showLoading();
      try {
        const response = await getUserProfileApi(profile.user_id)
        setDetail(response)
      } catch (error) {
        if(isApiError(error)) {
          console.log('프로필 조회 실패 : ', error.status)
        }
      } finally {
        hideLoading();
      }
    }

    getImages()
    getProfile();
  }, []);

  async function getImages() {
    const response = await getUserProfileApi(profile.user_id)
    const uri = response.images
    console.log(uri)
    uri.map(item => {
      setImageList(prev => [ ...prev, `http://3.35.223.187:8000${item.image}` ]);
    })

  }

  return (
    <ScrollView style={styles.container}>
      <PagerView
        ref={pageRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        {imageList.map((item, index) => (
          <Image key={index} source={{uri: item}} style={styles.image} />
        ))}
      </PagerView>

      {/*태그*/}
      <View style={[styles.section, { marginTop: 20 }]}>
        <ProfileTag text={profile.location} />
        <ProfileTag text={profile.job} />
        <ProfileTag text={profile.mbti} />
      </View>

      {/*이름, 사는곳*/}
      <View style={[styles.section, { marginTop: 20 }]}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>
          {`${profile.nickname} ${profile.age}세`}
        </Text>
      </View>

      {/*쿠피의 한 줄평*/}
      <View style={[styles.section, { marginTop: 24 }]}>
        <View style={styles.bubble}>
          <View style={styles.bubbleSection}>
            <Image
              source={require('../../../assets/cupi.png')}
              style={{ marginRight: 7, width: 30, height: 25,  }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              쿠피의 한 줄평
            </Text>
          </View>

          <Text style={{ fontSize: 14, marginTop: 14, letterSpacing: 2 }}>{report}</Text>
        </View>
      </View>

      <View style={[styles.section, { marginTop: 24 }]}>
        <View style={styles.bubble2}>
          <View>
            <Text style={styles.title}>우리의 사주 케미</Text>
            <Text style={{ fontSize: 11, color: '#9c9c9c', marginTop: 3 }}>
              회원님과의 사주 조화 점수예요.
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: colors.pink,
              }}
            >
              { profile.total_score ? Math.ceil(profile.total_score) : 0}
            </Text>
            <Text style={[styles.title, { marginLeft: 3 }]}>점</Text>
          </View>
        </View>
      </View>
      {/*쿠피의 한 줄평*/}

      {/*나에 대해*/}
      <View style={[styles.section, { marginTop: 40 }]}>
        <Text style={styles.title}>나에 대해</Text>
      </View>

      <View style={[styles.section, { marginTop: 18 }]}>
        <Text style={styles.text}>{detail?.profile_text}</Text>
      </View>
      {/*나에 대해*/}

      {/*관심사 키워드*/}
      <View style={[styles.section, { marginTop: 40 }]}>
        <Text style={styles.title}>관심사 키워드</Text>
      </View>

      <View style={[styles.section, { marginTop: 18 }]}>
        {detail?.hobbies !== null && detail?.hobbies.map(item => (
          <ProfileTag text={addEmoji(item)} />
        ))}
      </View>
      {/*관심사 키워드*/}

      <View style={[styles.section, { marginTop: 120 }]}/>
    </ScrollView>

  );
}

export default DetailCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  bubble: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 14,
    backgroundColor: '#f6f6f6',
  },
  bubble2: {
    width: '100%',
    height: 100,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 14,
    backgroundColor: '#f6f6f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bubbleSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: windowWidth,
    height: 450,
  },
  section: {
    width: windowWidth,
    height: 'auto',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: 'black',
    letterSpacing: 1,
    lineHeight: 20,
  },
  pager: {
    width: '100%',
    height: 450,
  }
});

const emojiMap: Record<string, string> = {
  골프: '🏌️',
  축구: '⚽',
  농구: '🏀',
  러닝: '🏃',
  서핑: '🏄',
  스키: '🎿',
  야구: '⚾',
  자전거: '🚴',
  스킨스쿠버: '🐬',
  요가: '🧘',
  헬스: '💪',
  크로스핏: '🏋️‍♂️',
  클라이밍: '🧗‍♀️',
  테니스: '🎾',
  프리다이빙: '🥽',
  필라테스: '💃',

  낚시: '🎣',
  드라이브: '🚗',
  등산: '🥾',
  산책: '🚶',
  '맛집 투어': '🍝',
  '스포츠 관람': '🏅',
  여행: '✈️',
  캠핑: '🏕️',
  '파인 다이닝': '🍽️',

  게임: '🎮',
  공연: '🎭',
  노래: '🎤',
  댄스: '💃',
  그림: '👨‍🎨',
  글쓰기: '✍️',
  독서: '📚',
  웹툰: '🖼️',
  덕질: '👑',
  악기: '🎸',
  사진: '📸',
  전시회: '🖼️',
  술: '🍷',
  애니메이션: '🎞️',
  영화: '🎬',
  예능: '📺',

  반려동물: '🐕',
  봉사활동: '🙌',
  인테리어: '🛠️',
  자기개발: '📈',
  뷰티: '💄',
  '외국어 공부': '📜',
  쇼핑: '🛍️',
  자동차: '🚗',
  패션: '👗',
  SNS: '📱',
};


