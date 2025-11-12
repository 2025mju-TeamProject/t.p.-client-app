import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

function WriteProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <ScrollView
        indicatorStyle={undefined}
        horizontal={true}
        scrollEnabled={false}
      ></ScrollView>
    </ScrollView>
  );
}

export default WriteProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
