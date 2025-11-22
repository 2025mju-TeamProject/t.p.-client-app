import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
function AlarmScreen({ navigation }: any) {
  const items: Array<listProps> = getItems();

  return (
    <View style={styles.container}>
      {/*헤더*/}
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-sharp" size={25} />
          </TouchableOpacity>

          <Text style={styles.headerText}>알림</Text>
        </View>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            image={item.image}
            name={item.name}
            age={item.age}
            tag={item.tag}
            time={item.time}
            onClick={() => {}}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Icon name={'alert-circle-outline'} size={20} color="#828282" />
            <Text style={{ fontSize: 12, fontWeight: 400, color: '#828282' }}>
              최근 7일 내 알림만 보관됩니다.
            </Text>
          </View>
        }
      />
    </View>
  );
}

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 94,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    width: '100%',
    height: 37,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 700,
    marginLeft: 8,
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
    alignItems: 'center',
  },
  footer: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
  },
});

type listProps = {
  image: any;
  name: string;
  age: number;
  tag: string;
  time: string;
  onClick?: () => void;
};

export function ListItem({
  image,
  name,
  age,
  tag,
  time,
  onClick = () => {},
}: listProps) {
  return (
    <TouchableOpacity style={styles.listContainer} onPress={onClick}>
      <View>
        <Image
          style={{ width: 54, height: 54, borderRadius: 50 }}
          source={image}
        />
      </View>
      <View
        style={{
          marginLeft: 10,
          flex: 1,
          marginRight: 'auto',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: '50%',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 700 }}>{name}</Text>
          <Text> · </Text>
          <Text style={{ fontSize: 14, fontWeight: 700 }}>{age}세</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: '50%',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 400, color: '#828282' }}>
            {tag}
          </Text>
        </View>
      </View>

      <View style={{ height: '100%', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 10, fontWeight: 400, color: '#828282' }}>
          {time}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function getItems() {
  return new Array<listProps>(
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: '감자맛탕',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      name: 'last',
      age: 29,
      tag: '경기 용인시 / 회사원 / INTJ',
      time: '지금',
    },
  );
}
