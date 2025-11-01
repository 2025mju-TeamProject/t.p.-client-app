import React from 'react'
import styles from 'react-native-webview/lib/WebView.styles';
import { View, Text } from 'react-native';
import Header from '../../../components/common/Header';

function LikeScreen() {
  return (
    <View style={styles.container}>
      <Header title="관심" />
    </View>
  )
}

export default LikeScreen;