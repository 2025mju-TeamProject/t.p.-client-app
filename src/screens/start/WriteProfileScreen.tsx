import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import LoginScreen from '../../screens/start/LoginScreen';

function WriteProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>헤더</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <ScrollView
          indicatorStyle={undefined}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          scrollEnabled={false}
          style={styles.screenContainer} >
          <LoginScreen />
          <LoginScreen />
        </ScrollView>
      </ScrollView>
      <View style={styles.bottom}>
        <Text >skndkan</Text>
      </View>
    </View>
  );
}

export default WriteProfileScreen;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  scrollView: {
    width: '100%',
    height: 'auto',
  },
  screenContainer: {
    width: 'auto',
    height: 'auto',
  },
  bottom: {
    width: '100%',
    height: 126,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
