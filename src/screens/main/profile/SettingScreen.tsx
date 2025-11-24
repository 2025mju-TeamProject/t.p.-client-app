import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/colors';
import ROUTES from '../../../constants/routes';

function SettingScreen({ navigation }: any) {

  // 뒤로가기: 이전 화면으로 이동(스택 뒤로가기)
  const goBack = () => { navigation.goBack(); };

  // 메뉴 아이템 컴포넌트
  const MenuItem = ({ title }: { title: string }) => (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#B1B1B1" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 고정 헤더 영역 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
      </View>

      {/* 아래 내용만 스크롤 */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* 알림 섹션 */}
        <Text style={styles.sectionTitle}>알림</Text>
        <MenuItem title="알림 설정" />

        <View style={styles.divider} />

        {/* 운영 섹션 */}
        <Text style={styles.sectionTitle}>운영</Text>
        <MenuItem title="공지사항" />
        <MenuItem title="고객센터" />
        <MenuItem title="이용약관" />
        <MenuItem title="개인정보처리방침" />

        <View style={styles.divider} />

        {/* 계정 섹션 */}
        <Text style={styles.sectionTitle}>계정</Text>
        <MenuItem title="로그아웃" />
        <MenuItem title="계정삭제" />

        {/* 앱 정보 */}
        <View style={{ padding: 20 /* 상하좌우 여백*/ }}>
          <Text style={styles.versionText}>APP Version 1.0.0</Text>
          <Text style={styles.versionText}>CODE Version 0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 36,
  },
  backButton: {
    paddingRight: 3,
    paddingLeft: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#979797',
    marginTop: 24,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuText: {
    fontSize: 15,
    color: '#111111',
  },

  divider: { /* 영역 나누는 회색 직선 */
    height: 1,
    backgroundColor: '#D9D9D9',
    marginTop: 10,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 2,
  },

  versionText: {
    color: '#B1B1B1',
    fontSize: 12,
  },
});

export default SettingScreen;