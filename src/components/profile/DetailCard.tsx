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
import colors from '../../constants/colors';

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

      {/*태그*/}
      <View style={[styles.section, { marginTop: 20 }]}>
        <ProfileTag text={'궁합점수 80점'} />
        <ProfileTag text={'IT 개발직'} />
      </View>

      {/*이름, 사는곳*/}
      <View style={[styles.section, { marginTop: 20 }]}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>
          감자맛탕 29세
        </Text>
      </View>
      <View style={[styles.section, { marginTop: 10 }]}>
        <Text style={{ fontSize: 14 }}>경기도 용인시 / 회사원 / INTJ</Text>
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

          <Text style={{ fontSize: 14, marginTop: 14, letterSpacing: 2 }}>
            감자깡은 사교적이고 자유로운 기운이 강해 처음엔 나와 속도가 다를 수
            있지만, 그 밝고 활발한 에너지가 내 삶에 새로운 활력을 줄 것 같아요.
            감자깡은 따뜻하고 포용적인 마음이 커서, 때로는 내 감정을 더 깊게
            바라보게 하고 서로의 차이 속에서 성장할 수 있을 것 같아요.
          </Text>
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
              62
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
        <Text style={styles.text}>
          안녕하세요, 감자맛탕입니다. 고양이 털에 묻은 그래픽 디자이너이며,
          주말엔 캠핑을 즐기는 '갑술' 여자입니다. 갑술의 성향처럼 편안한
          사람들과 어울리는 것을 좋아해요. LP판을 들으며 마시는 커피 한 잔의
          여유를 아는 그런… 가끔은 말수가 적어도 이해해주실 수 있나요? 그렇다면,
          긍정적이고 따뜻한 세상을 함께 만들어가요. 유머가 조금 섞인, 친근한
          대화로 시작해볼까요?
        </Text>
      </View>
      {/*나에 대해*/}

      {/*관심사 키워드*/}
      <View style={[styles.section, { marginTop: 40 }]}>
        <Text style={styles.title}>관심사 키워드</Text>
      </View>

      <View style={[styles.section, { marginTop: 18 }]}>
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
        <ProfileTag text={'농구'} />
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
