import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../constants/colors';

type Props = { title: string };

function Header({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'SCDream7' }]}>
        {title}
      </Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    height: 107,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    color: 'black',
    marginBottom: 14,
    marginLeft: 24,
  },
});
