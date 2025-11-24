import React from 'react';
import { ScrollView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/common/Header';
import colors from '../../../constants/colors';
import ROUTES from '../../../constants/routes';

function ProfileScreen({ navigation }: any) {
  // 유저 임시데이터, TODO: 실제 유저 데이터 연동
  const user = {
    nickname: '고구맛탕',
    avatar: require('../../../../assets/sample-profile2.jpg'),
  };

  const goEdit = () => navigation.navigate(ROUTES.PROFILE_EDIT);
  const goPreview = () => navigation.navigate(ROUTES.PROFILE_PREVIEW);
  const goSettings = () => navigation.navigate(ROUTES.SETTINGS);

  return (
    <ScrollView style={styles.container}>
      <Header title="프로필" />

      <View style={{ marginTop: 0 }}>
        <View style={styles.profileCard}>
          <Image source={user.avatar} style={styles.avatar} />
          <Text style={styles.nickname}>{user.nickname}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.list}>
          <ListItem icon="create-outline" label="프로필 편집" onPress={goEdit} />
          <ListItem icon="eye-outline" label="프로필 미리보기" onPress={goPreview} />
          <ListItem icon="settings-outline" label="설정" onPress={goSettings}/>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;

function ListItem({
  icon,
  label,
  onPress,
  isLast,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  isLast?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.item, isLast && styles.itemLast]}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={icon as any} size={20} color="#202124" />
        <Text style={styles.itemText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#9AA0A6" />
    </TouchableOpacity>
  );
}

const AVATAR = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 100,
  },
  profileCard: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: '#e9e9e9',
  },
  nickname: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: '600',
    color: '#111',
    marginBottom: 30,
  },

  list: {
    backgroundColor: colors.background,
    borderTopColor: '#D9D9D9',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  item: {
    paddingHorizontal: 26,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemText: { fontSize: 15, color: '#111111' },
});
