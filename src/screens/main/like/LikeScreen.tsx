import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/Ionicons';
import ROUTES from '../../../constants/routes';
import LikeHeader from '../../../components/common/HeaderLikeScreen';
import { useLoading } from '../../../context/LoadingContext';
import { getHeartList, LikeListResponse } from '../../../api/interacion';
import { useAuth } from '../../../context/AuthContext';
import { isApiError } from '../../../api/auth';
import { useFocusEffect } from '@react-navigation/native';
import { getMatchingReportApi } from '../../../api/profile';
import { formatRelativeTime } from '../../../utils/time'

function LikeScreen({ navigation }: any) {
  const pageRef = useRef<PagerView>(null);
  const [page, setPage] = useState<number>(0);
  const { showLoading, hideLoading } = useLoading()
  const { accessToken } = useAuth()

  const [receiveItems, setReceiveItems] = useState<LikeListResponse[]>([])
  const [sendItems, setSendItems] = useState<LikeListResponse[]>([])

  useFocusEffect(
    useCallback(() => {
      if(!accessToken) return;

      async function getHeartList() {
        const received = await loadLikeItems(false)
        const sent = await loadLikeItems(true)

        if(received !== undefined) setReceiveItems(received)
        if(sent !== undefined) setSendItems(sent)

      }

      getHeartList()
      return () => {}
    }, [])
  )

  async function loadLikeItems(isMine: boolean) {
    if (!accessToken) return;

    showLoading();
    try {
      const response = await getHeartList(accessToken, isMine);

      return response;
    } catch (error) {
      if(isApiError(error)) {
        console.log(error);
      }
    } finally {
      hideLoading();
    }
  }

  function changePage(page: number) {
    if (!pageRef.current) return;
    setPage(page);
    pageRef.current.setPage(page);
  }

  async function navigateToDetail(userId: number) {
    if(!accessToken) return;
    showLoading();

    try {
      const report = await getMatchingReportApi(userId, accessToken);
    } catch(error) {
      if(isApiError(error)) {
        console.log(error);
      }
    }
  }

  return (
    <View style={styles.container}>

      {/* ✔ 공용 헤더 사용 */}
      <LikeHeader
        title="하트"
        subtitle="회원님과 ‘하트’를 주고 받은 분들을 확인해 보세요!"
      />

      {/* 탭 영역 */}
      <View style={styles.pageSelecter}>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => changePage(0)}
        >
          <View style={styles.tabInner}>
            <Text style={{ fontSize: 12, fontWeight: 700, color: page === 0 ? 'black' : '#9C9C9C' }}>받은 하트</Text>
          </View>
          <View style={{ width: '100%', height: 3, backgroundColor: page === 0 ? 'black' : 'white' }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => changePage(1)}
        >
          <View style={styles.tabInner}>
            <Text style={{ fontSize: 12, fontWeight: 700, color: page === 1 ? 'black' : '#9C9C9C' }}>보낸 하트</Text>
          </View>
          <View style={{ width: '100%', height: 3, backgroundColor: page === 1 ? 'black' : 'white' }} />
        </TouchableOpacity>
      </View>

      {/* Pager */}
      <PagerView
        ref={pageRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        {/* 받은 하트 */}
        <View key={'received'}>
          <FlatList
            data={receiveItems}
            renderItem={({ item }) => (
              <ListItem
                image={`http://3.35.223.187:8000${item.target_profile.image}`}
                name={item.target_profile.nickname}
                age={item.target_profile.age}
                tag={`${item.target_profile.location_city}·${item.target_profile.location_district}·${item.target_profile.mbti}`}
                time={formatRelativeTime(item.created_at)}
                // onClick={() => navigateToDetail(item.target_profile.user_id)}
              />
            )}
            ListFooterComponent={
              <View style={styles.footer}>
                <Icon name={'alert-circle-outline'} size={20} color="#828282" />
                <Text style={styles.footerText}>최근 7일 내 받은 하트만 보관됩니다.</Text>
              </View>
            }
          />
        </View>

        {/* 보낸 하트 */}
        <View key={'send'}>
          <FlatList
            data={sendItems}
            renderItem={({ item }) => (
              <ListItem
                image={`http://3.35.223.187:8000${item.target_profile.image}`}
                name={item.target_profile.nickname}
                age={item.target_profile.age}
                tag={`${item.target_profile.location_city} · ${item.target_profile.location_district} · ${item.target_profile.mbti}`}
                time={formatRelativeTime(item.created_at)}
                // onClick={() => navigateToDetail(item.target_profile.user_id)}
              />
            )}
            ListFooterComponent={
              <View style={styles.footer}>
                <Icon name={'alert-circle-outline'} size={20} color="#828282" />
                <Text style={styles.footerText}>최근 7일 내 받은 하트만 보관됩니다.</Text>
              </View>
            }
          />
        </View>

      </PagerView>
    </View>
  );
}

export default LikeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  pageSelecter: {
    width: '100%',
    height: 43,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  pageButton: {
    width: '50%',
    height: 43,
    alignItems: 'center',
  },

  tabInner: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pager: { flex: 1 },

  listContainer: {
    width: '100%',
    height: 100,
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },

  footer: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
  },

  footerText: {
    fontSize: 12,
    fontWeight: 400,
    color: '#828282',
    marginLeft: 6,
  }
});

type listProps = {
  image: any;
  name: string;
  age: number;
  tag: string;
  time: string;
  onClick?: () => void;
};

export function ListItem({ image, name, age, tag, time, onClick = () => {} }: listProps) {
  return (
    <TouchableOpacity style={styles.listContainer} onPress={onClick}>
      <Image style={{ width: 54, height: 54, borderRadius: 50 }} source={{uri: image}} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: 700 }}>{name} · {age}세</Text>
        <Text style={{ fontSize: 12, color: '#828282' }}>{tag}</Text>
      </View>
      <Text style={{ fontSize: 10, color: '#828282' }}>{time}</Text>
    </TouchableOpacity>
  );
}