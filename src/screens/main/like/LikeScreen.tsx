import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/Ionicons';
import ROUTES from '../../../constants/routes';

function LikeScreen({navigation}: any) {
  const pageRef = useRef<PagerView>(null);
  const [page, setPage] = useState<number>(0);
  const receiveItems: Array<listProps> = getItems();
  const sendItems: Array<listProps> = getItems();

  function changePage(page: number) {
    if(!pageRef.current) return;

    setPage(page);
    pageRef.current.setPage(page);
  }

  function navigateToDetail(userId: number) {
    navigation.navigate(ROUTES.DETAIL)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>하트</Text>
        <Text style={{fontSize: 12, fontWeight: 700, color: '#9c9c9c', marginBottom: 8}}>회원님과 ‘하트’를 주고 받은 분들을 확인해 보세요!</Text>
      </View>

      <View style={styles.pageSelecter}>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => changePage(0)}>

          <View style={{height: 40, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 12, fontWeight: 700, color: page === 0 ? 'black' : '#9C9C9C'}}>
              받은 하트
            </Text>
          </View>
          <View style={{width: '100%', height: 3, backgroundColor: page === 0 ? 'black' : 'white'}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => changePage(1)}>

          <View style={{height: 40, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 12, fontWeight: 700, color: page === 1 ? 'black' : '#9C9C9C'}}>
              보낸 하트
            </Text>
          </View>
          <View style={{width: '100%', height: 3, backgroundColor: page === 1 ? 'black' : 'white'}} />
        </TouchableOpacity>
      </View>

      <PagerView
        ref={pageRef}
        style={styles.pager}
        initialPage={0}
        scrollEnabled={true}
        onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        <View key={'received'}>
          <FlatList
            data={receiveItems}
            renderItem={({ item }) => (
              <ListItem
                image={item.image}
                name={item.name}
                age={item.age}
                tag={item.tag}
                time={item.time}
                onClick={() => navigateToDetail(0)}
              />
            )}
            ListFooterComponent={
              <View style={styles.footer}>
                <Icon name={'alert-circle-outline'} size={20} color="#828282" />
                <Text style={{fontSize: 12, fontWeight: 400, color: '#828282'}}>최근 7일 내 받은 하트만 보관됩니다.</Text>
              </View>
            }
          />
        </View>
        <View key={'send'}>
          <FlatList
            data={sendItems}
            renderItem={({ item }) => (
              <ListItem
                image={item.image}
                name={item.name}
                age={item.age}
                tag={item.tag}
                time={item.time}
                onClick={() => navigateToDetail(0)}
              />
            )}
            ListFooterComponent={
              <View style={styles.footer}>
                <Icon name={'alert-circle-outline'} size={20} color="#828282" />
                <Text style={{fontSize: 12, fontWeight: 400, color: '#828282'}}>최근 7일 내 받은 하트만 보관됩니다.</Text>
              </View>
            }
          />

        </View>
      </PagerView>
    </View>
  )
}

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 132,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 700,
  },
  pageSelecter: {
    width: '100%',
    height: 43,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  pageButton: {
    width: '50%',
    height: 43,
    alignItems: 'center',
  },
  pager: {
    flex: 1,
  },
  listContainer: {
    width: '100%',
    height: 100,
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  footer: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
  }
});

type listProps = {
  image: any;
  name: string;
  age: number;
  tag: string;
  time: string;
  onClick?: () => void;
}

export function ListItem({image, name, age, tag, time, onClick = () => {}}: listProps) {
  return (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={onClick}
    >
      <View>
        <Image
          style={{width:54, height: 54, borderRadius: 50}}
          source={image} />
      </View>
      <View style={{marginLeft: 10, flex: 1, marginRight: 'auto', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
        <View style={{flex: 1, flexDirection: 'row', height: '50%', alignItems: 'center'}}>
          <Text style={{fontSize: 14, fontWeight: 700}}>{name}</Text>
          <Text> · </Text>
          <Text style={{fontSize: 14, fontWeight: 700}}>{age}세</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', height: '50%', alignItems: 'center'}}>
          <Text style={{fontSize: 12, fontWeight: 400, color: '#828282'}}>{tag}</Text>
        </View>
      </View>

      <View style={{height: '100%', justifyContent: 'flex-start'}}>
        <Text style={{fontSize: 10, fontWeight: 400, color: '#828282'}}>{time}</Text>
      </View>
    </TouchableOpacity>
  )
}

function getItems() {
  return new Array<listProps>(
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },{
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },{
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },{
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },{
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },{
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },{
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },{
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },{
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },{
      image: require('../../../../assets/sample-profile2.jpg'),
      name: 'last',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금'
    },
  )
}