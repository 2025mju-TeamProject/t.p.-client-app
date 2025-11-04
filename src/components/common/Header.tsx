import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../constants/colors';

type Props = {title: String};

function Header({title}: Props)  {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
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
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 14,
    marginLeft: 24,
  }
})