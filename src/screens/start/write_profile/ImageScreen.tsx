import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './writeProfileStyles';
import AddImageButton from '../../../components/buttons/AddImageButton';

function ImageScreen() {

  // 이미지 6개를 저장하는 상태값
  const [images, setImages] = useState([null, null, null, null, null, null]);

  // 특정 인덱스의 이미지 업데이트
  const handleSelectImage = (index: number, uri: string) => {
    setImages(prev => {
      const next = [...prev];
      next[index] = uri;    // 선택된 이미지 넣기
      return next;
    });
  };

  // 특정 인덱스의 이미지 삭제
  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const next = [...prev];
      next[index] = null;   // 해당 칸 비우기
      return next;
    });
  };

  return (
    <View style={styles.container}>

      {/* 화면 상단 타이틀 */}
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.title}>{'회원님의 프로필\n사진을 등록해 볼까요?'}</Text>
      </View>

      {/* 설명 문구 */}
      <View style={[styles.section, { marginTop: 5 }]}>
        <Text style={styles.subTitle}>최소 2개, 최대 6개까지 등록할 수 있어요</Text>
      </View>

      <ScrollView style={{ marginTop: 20 }}>

        {/* 사진 등록 버튼 영역 */}
        <View
          style={[
            styles.section,
            {
              marginTop: 16,
              height: 200,
              backgroundColor: 'white',
              flexWrap: 'wrap',
              gap: 8,
            },
          ]}
        >
          {images.map((img, i) => (
            <AddImageButton
              key={i}
              bubble={i < 2 ? '필수' : ''}  // 앞 두 칸만 "필수" 표시
              index={i}                     // 몇번째 칸인지 전달
              image={img}                   // 칸에 들어갈 이미지
              onSelect={handleSelectImage}  // 이미지 선택 이벤트
              onRemove={handleRemoveImage}  // 이미지 삭제 이벤트
            />
          ))}
        </View>

        {/* 가이드 타이틀 */}
        <View style={[styles.section, { marginTop: 40 }]}>
          <Text style={styles.boldTextBB}>사진 등록 가이드</Text>
        </View>

        {/* 가이드 설명 영역 */}
        <View style={[styles.section, { marginTop: 15, marginBottom: 15 }]}>
          <View style={localStyles.container}>

            {/* 가이드 문구들 */}
            <GuideText>
              이목구비가
              <Text style={{ fontFamily: 'NanumSquareB' }}> 또렷하게 잘 나온 상반신 정면 사진을 필수로 두 장 </Text>
              등록해 주세요.
            </GuideText>

            <GuideText
              text={'나머지는 회원님의 매력을 어필할 수 있는 사진을 자유롭게 등록해 주세요. (단, 사물, 음식, 배경 사진 등 본인의 모습이 나오지 않았거나 중복된 사진은 불가)'}
              margin={8}
            />

            <GuideText
              text={'타인과 함께 찍은 사진은 개인정보보호를 위해 본인만 남기고 모자이크 처리나 스티커로 가려주세요.'}
              margin={8}
            />

            <GuideText
              text={'사진 등록 가이드를 지키지 않을 경우, 심사에서 반려될 수 있습니다.'}
              margin={8}
            />

          </View>
        </View>

      </ScrollView>

    </View>
  );
}
function GuideText({ children, text, bold = false, margin = 0 }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: margin,
      }}
    >
      <Icon
        name="dot-single"
        size={20}
        color="black"
        style={{ position: 'relative', }}
      />

      {/* children 우선, 없으면 text 사용 */}
      <Text
        style={[
          bold ? styles.boldText : styles.text,
          { lineHeight: 19 },
        ]}
      >
        {children || text}
      </Text>
    </View>
  );
}


export default ImageScreen;

const localStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 18,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -4 },

  }
});
