import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = { text: string; };

function ProfileTag({text}: Props ) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default ProfileTag;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    backgroundColor: '#DADADA',
    borderRadius: 18,
  },
  text: {
    fontSize: 12,
    fontWeight: 500,
    color: '#434343',
  }
})