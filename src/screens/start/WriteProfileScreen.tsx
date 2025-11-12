import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StartScreen from '@screens/start/StartScreen';

function WriteProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <ScrollView
        indicatorStyle={undefined}
        horizontal={true}
        scrollEnabled={false}
        >

      </ScrollView>
    </ScrollView>
  );
}

export default WriteProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
