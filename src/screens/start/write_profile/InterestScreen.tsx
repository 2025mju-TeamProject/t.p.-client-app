import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import styles from './writeProfileStyles'
import SelectButton from '../../../components/buttons/SelectButton';

function InterestScreen() {
  const [selected, setSelected] = useState<Array<string>>([]);

  function handleSelected(item: string) {
    setSelected(prev => {
      if (prev.includes(item)) {
        return prev.filter(element => element !== item);
      }

      if (prev.length >= 8) {
        return prev;
      }

      return [...prev, item];
    });
  }


  return (
    <View style={styles.container}>
      <View style={[styles.section, {marginTop: 30}]}>
        <Text style={styles.title}>요즘 관심사가 무엇인가요?</Text>
      </View>
      <View style={[styles.section, {marginTop: 5}]}>
        <Text style={styles.subTitle}>최소 3개, 최대 8개까지 선택할 수 있어요.</Text>
      </View>

      <ScrollView style={{marginTop: 30}}>
        <View style={styles.section}>
          <Text style={[styles.boldText]}>🏃 운동 및 피트니스</Text>
        </View>

        <View style={[styles.section, {marginTop: 10, flexWrap: 'wrap', gap: 8}]}>
          {sportsItems.map((item, index) => (
            <SelectButton
              title={item}
              isSelected={selected.includes(item)}
              onPress={() => handleSelected(item)}
              textStyle={localStyles.buttonText}
              style={localStyles.button}/>
          ))}
        </View>

        <View style={[styles.section, {marginTop: 30}]}>
          <Text style={[styles.boldText]}>✈️ 여행 및 야외활동</Text>
        </View>
        <View style={[styles.section, {marginTop: 10, flexWrap: 'wrap', gap: 8}]}>
          {activityItems.map((item, index) => (
            <SelectButton
              title={item}
              isSelected={selected.includes(item)}
              onPress={() => handleSelected(item)}
              textStyle={localStyles.buttonText}
              style={localStyles.button}/>
          ))}
        </View>

        <View style={[styles.section, {marginTop: 30}]}>
          <Text style={[styles.boldText]}>🎨 문화 및 예술</Text>
        </View>
        <View style={[styles.section, {marginTop: 10, flexWrap: 'wrap', gap: 8}]}>
          {artItems.map((item, index) => (
            <SelectButton
              title={item}
              isSelected={selected.includes(item)}
              onPress={() => handleSelected(item)}
              textStyle={localStyles.buttonText}
              style={localStyles.button}/>
          ))}
        </View>

        <View style={[styles.section, {marginTop: 30}]}>
          <Text style={[styles.boldText]}>📚 생활 및 자기관리</Text>
        </View>
        <View style={[styles.section, {marginTop: 10, marginBottom: 30, flexWrap: 'wrap', gap: 8}]}>
          {livingItems.map((item, index) => (
            <SelectButton
              title={item}
              isSelected={selected.includes(item)}
              onPress={() => handleSelected(item)}
              textStyle={localStyles.buttonText}
              style={localStyles.button}/>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default InterestScreen;

const sportsItems = [
  '🏌️ 골프', '🏀 농구', '🏃 러닝', '🏄 서핑', '🎿 스키/스노우보드',
  '🐬 스킨스쿠버', '⚾ 야구', '🧘 요가', '💪 헬스', '🚴 자전거',
  '⚽ 축구', '🏋️‍♂️ 크로스핏', '🧗‍♀️ 클라이밍', '🎾 테니스', '🥽 프리다이빙', '💃 필라테스',
]

const activityItems = [
  '🎣 낚시', '🚗 드라이브', '🥾 등산', '🚶 산책', '🍝 맛집 투어',
  '🏅 스포츠 관람', '✈️ 여행', '🏕️ 캠핑', '🍽️ 파인 다이닝'
]

const artItems = [
  '🎮 게임', '🎭 공연 관람', '🎤 노래', '💃 댄스', '👨‍🎨 그림',
  '✍️ 글쓰기', '📚 독서', '🖼️ 웹툰', '👑 덕질', '🎸 악기', '📸 사진',
  '🖼️ 전시회', '🍷 술', '🎞️ 애니메이션', '🎬 영화', '📺 예능',
]

const livingItems = [
  '🐕 반려동물', '🙌 봉사활동', '🛠️ 인테리어', '📈 자기개발',
  '💄 뷰티', '📜 외국어 공부', '🛍️ 쇼핑', '🚗 자동차', '👗 패션', '📱 SNS'
]

const localStyles = StyleSheet.create({
  button: {
    width: 'auto',
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderColor: '#D9D9D9',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 700,
    color: '#434343'
  }
})