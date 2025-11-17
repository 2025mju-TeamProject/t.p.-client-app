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
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}
    contentContainerStyle={{paddingBottom: 60}}>

      {/* 뒤로가기 + 제목 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
      </View>

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
      <View style={{ padding: 20 }}>
        <Text style={styles.versionText}>APP Version 1.0.0</Text>
        <Text style={styles.versionText}>CODE Version 0</Text>
      </View>

    </ScrollView>
  );
}

export default SettingScreen;

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
    marginTop: 23,
  },
  backButton: {
    paddingRight: 5,
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
    marginTop: 25,
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
    fontSize: 17,
    color: '#000',
  },

  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginTop: 10,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
  },

  versionText: {
    color: '#aaa',
    fontSize: 13,
  },
});
