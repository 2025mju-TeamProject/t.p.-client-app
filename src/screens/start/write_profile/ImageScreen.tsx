import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './writeProfileStyles';
import AddImageButton from '../../../components/buttons/AddImageButton';
import { launchImageLibrary } from 'react-native-image-picker';

type Props = {
  setParentImage: (image: Array<ImageSourcePropType>) => void;
};

function ImageScreen({ setParentImage }: Props) {
  const [photoes, setPhotoes] = useState<Array<ImageSourcePropType>>([]);

  useEffect(() => {
    setParentImage(photoes);
  }, [photoes]);

  async function pickImage(index: number) {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1200,
        maxHeight: 1200,
      },
      res => {
        if (res.didCancel) return;
        if (res.errorCode) {
          console.log(res.errorMessage);
          return;
        }

        const uri = res.assets?.[0]?.uri;
        if (!uri) return;

        if (index < photoes.length) {
          setPhotoes(prev => {
            const newArr = [...prev];
            newArr[index] = { uri };
            return newArr;
          });

          return;
        }

        setPhotoes(prev => [...prev, { uri }]);
      },
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={styles.title}>{'프로필 사진을\n등록해 볼까요?'}</Text>
      </View>
      <View style={[styles.section, { marginTop: 5 }]}>
        <Text style={styles.subTitle}>
          최소 2개, 최대 6개까지 등록할 수 있어요
        </Text>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        <View
          style={[
            styles.section,
            {
              marginTop: 30,
              height: 200,
              backgroundColor: 'white',
              flexWrap: 'wrap',
              gap: 8,
            },
          ]}
        >
          <AddImageButton
            bubble={photoes.length < 1 ? '필수' : '대표'}
            onPress={() => pickImage(0)}
            background={photoes[0]}
          />
          <AddImageButton
            bubble={photoes.length < 2 ? '필수' : ''}
            onPress={() => pickImage(1)}
            background={photoes[1]}
          />
          <AddImageButton
            onPress={() => pickImage(2)}
            background={photoes[2]}
          />
          <AddImageButton
            onPress={() => pickImage(3)}
            background={photoes[3]}
          />
          <AddImageButton
            onPress={() => pickImage(4)}
            background={photoes[4]}
          />
          <AddImageButton
            onPress={() => pickImage(5)}
            background={photoes[5]}
          />
        </View>

        <View style={[styles.section, { marginTop: 30 }]}>
          <Text style={styles.boldText}>사진 등록 가이드</Text>
        </View>
        <View style={[styles.section, { marginTop: 15, marginBottom: 15 }]}>
          <View style={localStyles.container}>
            <GuideText
              text={
                '이목구비가 또렷하게 잘 나온 상반신 정면 사진을 필수로 두 장 등록해 주세요.'
              }
              bold={true}
            />
            <GuideText
              text={
                '나머지는 회원님의 매력을 어필할 수 있는 사진을 자유롭게 등록해 주세요. (단, 사물, 음식, 배경 사진 등 본인의 모습이 나오지 않았거나 중복된 사진은 불가)'
              }
              margin={4}
            />
            <GuideText
              text={
                '타인과 함께 찍은 사진은 개인정보보보를 위해 본인만 남기고 모자이크 처리나 스티커로 가려주세요.'
              }
              margin={4}
            />
            <GuideText
              text={
                '사진 등록 가이드를 지키기 않을 경우, 심사에서 반려될 수 있습니다.'
              }
              margin={4}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

type GuideProps = {
  text: string;
  bold?: boolean;
  margin?: number;
};

function GuideText({ text, bold = false, margin = 0 }: GuideProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: margin,
      }}
    >
      <Icon name={'dot-single'} size={20} color="black" />
      <Text style={[bold ? styles.boldText : styles.text]}>{text}</Text>
    </View>
  );
}

export default ImageScreen;

const localStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
