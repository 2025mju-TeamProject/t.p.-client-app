import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DetailCard from '../../../components/profile/DetailCard';
import { DetailProfileResponse, ProfileResponse } from '../../../api/profile';

type Props = {
  navigation: any;
  route: { params: DetailProfileResponse };
};

function MyProfileScreen({ navigation, route }: Props) {
  const profile = route.params;

  const myProfile: ProfileResponse = {
    user_id: profile.user_id,
    nickname: profile.nickname,
    age: profile.age,
    mbti: 'INTP',
    job: profile.job,
    gender: profile.gender,
    location: `${profile.location_city} ${profile.location_district}`,
    total_score: 0,
  };

  useEffect(() => {
    console.log(myProfile);
  }, []);

  return (
    <View style={styles.container}>
      <DetailCard profile={myProfile} report={'다른 회원님의 프로필을 볼 때\n서로의 궁합을 알려주는 곳입니다.'} />
    </View>
  );
}



export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
});
