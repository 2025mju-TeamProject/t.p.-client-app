import React from 'react';
import styles from 'react-native-webview/lib/WebView.styles';
import { View } from 'react-native';
import Header from '../../../components/common/Header';

function SettingScreen() {
  return (
    <View style={styles.container}>
      <Header title="프로필" />
    </View>
  );
}

export default SettingScreen;