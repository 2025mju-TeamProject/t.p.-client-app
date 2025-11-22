import React, { JSX } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  bubble?: string
}

const width = Dimensions.get('window').width;

function AddImageButton({bubble = ''}: Props) {
  return (
    <View style={styles.container}>
      {bubble !== '' && (
        <View style={styles.bubble}>
          <Text style={styles.text}>{bubble}</Text>
        </View>
      )}
      <Icon name={'plus'} size={30} color="#D2D2D2" />
    </View>
  )
}

export default AddImageButton;

const styles = StyleSheet.create({
  container: {
    width: (width - 48) / 3 - 8,
    height: (width - 48) / 3 - 8,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  text: {
    fontSize: 12,
    fontWeight: 700,
    color: 'black'
  }
})