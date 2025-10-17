import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

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

  return (
    <View
      style={[
        styles.cardWrapper,
        padding == 1 ? {marginRight: 0} : {marginRight: 24}, // 마지막 아이템만 marginBottom 40
      ]} >

      {/*프로필 카드*/}
      <View style={styles.profileCard}>
        <Image source={image} style={styles.image} />
        <View style={styles.infoBox}>
          <Text style={styles.name}>{name}</Text>
          <Text
            style={styles.subInfo}
          >{`${age}세 · ${distance} · ${job}`}</Text>
          <Text style={styles.tags}>
            {hashtags.map(tag => `#${tag}`).join(' ')}
          </Text>
        </View>
      </View>

      {/*AI 한줄평*/}
      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>궁합 한 줄평 (AI)</Text>
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
  aiCard: {
    width: '100%',
    marginTop: 12,
    backgroundColor: '#F6F6F6',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  aiTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
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
  infoBox: {
    padding: 14,
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
  tags: {
    marginTop: 8,
    color: '#888',
    fontSize: 13,
  },
});
