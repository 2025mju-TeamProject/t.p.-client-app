import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import * as child_process from 'node:child_process';
import { alignEnum } from 'react-native-svg/lib/typescript/lib/extract/extractViewBox';
import ProfileTag from './ProfileTag';

interface ProfileCardProps {
  name: string;
  age: number;
  distance: string;
  job: string;
  hashtags: string[];
  imagePath: string;
  padding: number;
}

const winWidth = Dimensions.get('window').width;

const RecommendCard: React.FC<ProfileCardProps> = ({
  name,
  age,
  distance,
  job,
  hashtags,
  imagePath,
  padding,
}) => {

  const image = require('../../assets/sample-profile2.jpg');
  const cupiImage = require('../../assets/cupi.png');

  return (
    <View
      style={[
        styles.cardWrapper,
        padding == 1 ? { marginRight: 0 } : { marginRight: 24 }, // 마지막 아이템만 marginBottom 40
      ]}
    >
      {/*프로필 카드*/}
      <View style={styles.profileCard}>
        <Image source={image} style={styles.image} />
      </View>

      {/*하단 카드*/}
      <View style={styles.infoBox}>
        {/*상단 태그*/}
        <View style={styles.tagContainer}>
          <View style={{marginRight: 10}}>
            <ProfileTag text="궁합점수 80점"/>
          </View>
          <View style={{marginRight: 0}}>
            <ProfileTag text="최근 접속"/>
          </View>
        </View>

        <Text style={styles.name}>{name} {age}세</Text>
        <Text style={styles.subInfo}>{`${distance} / ${job}`}</Text>

        {/*쿠피의 한줄평*/}
        <View style={styles.aiCard}>
          <Image source={cupiImage} style={styles.cupiImage} />
          <Text style={styles.aiTitle}>쿠피의 한 줄평</Text>
        </View>

        <Text style={styles.aiDesc}>
          감자맛탕 님과의 궁합은 서로의 관심사와 성격이 잘 맞는 편입니다. 대화의
          흐름이 자연스럽고 유머 코드도 비슷해요.
        </Text>
      </View>
    </View>
  );
};

export default RecommendCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: winWidth - 48,
  },
  aiTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
  },
  aiCard: {
    marginBottom: 8,
    marginTop: 19,
    flexDirection: 'row',
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
  cupiImage: {
    width: 20,
    height: 20,
    marginRight: 2,
    resizeMode: 'cover',
    borderRadius: 16,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  subInfo: {
    marginTop: 4,
    color: '#666',
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 18,
  },
});
