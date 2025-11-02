import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import DetailCard from '../../../components/profile/DetailCard';

function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text >asnd</Text>
      <DetailCard />
    </View>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
