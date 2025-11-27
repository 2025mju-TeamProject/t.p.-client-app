import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';

type Props = {
  bubble?: string;
  index: number;
  image: string | null;
  onSelect: (index: number, uri: string) => void;
  onRemove: (index: number) => void;
};

const width = Dimensions.get('window').width;
const side = (width - 48) / 3 - 8;

function AddImageButton({ bubble = '', index, image, onSelect, onRemove }: Props) {
  const handlePress = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.didCancel) return;

    const uri = result.assets?.[0]?.uri;
    if (uri) onSelect(index, uri);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={!image ? handlePress : undefined}>

      {/* bubble (필수) */}
      {bubble !== '' && !image && (
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{bubble}</Text>
        </View>
      )}

      {/* 미리보기 이미지 */}
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.preview} />

          {/* X 삭제 버튼 */}
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => onRemove(index)}
          >
            <Icon name="x" size={18} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <Icon name="plus" size={30} color="#D2D2D2" />
      )}
    </TouchableOpacity>
  );
}

export default AddImageButton;

const styles = StyleSheet.create({
  container: {
    width: side,
    height: side,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  bubble: {
    width: 37,
    height: 21,
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 6,
    backgroundColor: '#D2D2D2',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  bubbleText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
  },

  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  removeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
});
