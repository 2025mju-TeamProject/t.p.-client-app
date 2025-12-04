import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfileTag from './ProfileTag';

interface ProfileCardProps {
  name: string;
  age: number;
  distance: string;
  hashtags: string[];
  job: string;
  mbti: string
  imagePath: string;
  report: string;
  onPress: () => void;
}

const winWidth = Dimensions.get('window').width;

const RecommendCard: React.FC<ProfileCardProps> = ({
  name,
  age,
  distance,
  job,
  mbti,
  imagePath,
  report,
  onPress,
}) => {

  const image = require('../../../assets/sample-profile2.jpg');
  const cupiImageLeft = require('../../../assets/cupi_wings_left.png');
  const cupiImageRight = require('../../../assets/cupi_wings_right.png');

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1.0}>
      <View style={[styles.cardWrapper, { marginBottom: 16 }]}>
        {/*프로필 카드*/}
        <View style={styles.profileCard}>
          <Image source={image} style={styles.image} />
        </View>

        {/*하단 카드*/}
        <View style={styles.infoBox}>
          {/*상단 태그*/}
          <View style={styles.tagContainer}>
            <View style={{ marginRight: 8 }}>
              <ProfileTag text={distance} />
            </View>
            <View style={{ marginRight: 8 }}>
              <ProfileTag text={job} />
            </View>
            <View style={{ marginRight: 8 }}>
              <ProfileTag text={mbti} />
            </View>
          </View>

          {/* 사용자 이름 + 나이 */}
          <Text style={styles.name}>
            {name} <Text style={styles.age}> {age}세</Text>
          </Text>

          {/* 쿠피의 한줄평 */}
          <View style={styles.aiCard}>
            <Image source={cupiImageLeft} style={styles.cupiImageLeft} />
            <Text style={styles.aiTitle}>쿠피의 한 줄평</Text>
            <Image source={cupiImageRight} style={styles.cupiImageRight} />
          </View>

          <Text style={styles.aiDesc}>{report}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: winWidth - 48,
  },
aiTitle: {
  fontSize: 16,
  marginBottom: 2,
  marginTop: 4,
  marginLeft: 3,
  fontFamily: 'NanumSquareEB',
  color: '#333333',
  letterSpacing: -0.5,    // 자간 줄이기
},

  aiCard: {
    marginBottom: 10,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiDesc: {
    color: '#555',
    lineHeight: 20,
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 383,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  cupiImageLeft: {
    width: 24,
    height: 24,
    marginRight: 1,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  cupiImageRight: {
    width: 24,
    height: 24,
    marginLeft: 1,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  infoBox: {
    width: '100%',
    marginTop: 12,
    backgroundColor: '#F6F6F6',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
    name: {
      fontSize: 26,
      color: '#333333',
      fontFamily: 'SCDream7',
      letterSpacing: -0.5,
    },
    age: {
      fontSize: 23,
      color: '#333333',
      fontFamily: 'SCDream7',
      letterSpacing: -0.5,
    },

  // 태그랑 이름 사이 여백
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 14,
  },
});
