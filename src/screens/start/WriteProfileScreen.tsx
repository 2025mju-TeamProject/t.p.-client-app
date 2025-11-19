import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BirthdayScreen from '../../screens/start/write_profile/BirthdayScreen';
import GenderScreen from '../../screens/start/write_profile/GenderScreen';
import AppButton from '../../components/buttons/AppButton';
import colors from '../../constants/colors';
import PagerView from 'react-native-pager-view';
import InterestScreen from '../../screens/start/write_profile/InterestScreen';
import MbtiScreen from '../../screens/start/write_profile/MbtiScreen';
import JobScreen from '../../screens/start/write_profile/JobScreen';
import LocationScreen from '../../screens/start/write_profile/LocationScreen';
import ImageScreen from '../../screens/start/write_profile/ImageScreen';
import IntroductionScreen from '../../screens/start/write_profile/IntroductionScreen';

function WriteProfileScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState<number>(0);
  const [gender, setGender] = useState<string>('');

  const totalPages = 8;

  function goNext() {
    if (!pagerRef.current) return;
    if (page >= totalPages - 1) return;

    pagerRef.current.setPage(page + 1);
  }

  function goBack() {
    if (!pagerRef.current) return;
    if (page <= 0) return;

    pagerRef.current.setPage(page - 1);
  }

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        {/*<Text style={{ color: 'black' }}>{gender}</Text>*/}
      </View>

      {/* 페이지 뷰 */}
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        <View key="gender">
          <GenderScreen
            choosed={gender}
            onPress={value => {
              setGender(value);
            }}
          />
        </View>

        <View key="birthday">
          <BirthdayScreen />
        </View>

        <View key="interset">
          <InterestScreen />
        </View>

        <View key="mbti">
          <MbtiScreen />
        </View>

        <View key="job">
          <JobScreen />
        </View>

        <View key="location">
          <LocationScreen />
        </View>

        <View key="image">
          <ImageScreen />
        </View>

        <View key="introduction">
          <IntroductionScreen />
        </View>
      </PagerView>

      {/* 하단 버튼  */}
      <View style={[styles.bottomTab, {gap: 10}]}>
        {page > 0 && (
          <>
            <AppButton
              title="이전"
              tintColors={{ true: '#f4f4f4', false: '#B1B1B1' }}
              onPress={goBack}
              isAbled={true}
              buttonStyle={styles.backButton}
              textColor={'#434343'} />

            <AppButton
              title="다음"
              tintColors={{ true: colors.pink, false: '#B1B1B1' }}
              onPress={goNext}
              isAbled={true} />
          </>
        )}
        {page == 0 && (
          <AppButton
            title="다음"
            tintColors={{ true: colors.pink, false: '#B1B1B1' }}
            onPress={goNext}
            isAbled={true}
          />
        )}

      </View>
    </View>
  );
}

export default WriteProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  pager: {
    flex: 1,
  },
  bottomTab: {
    width: '100%',
    height: 126,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  backButton: {
    width: 101,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
});
