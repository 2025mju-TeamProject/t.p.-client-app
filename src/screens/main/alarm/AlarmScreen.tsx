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
            title={item.title}
            content={item.content}
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
  title: string;
  content: string;
  time: string;
  onClick?: () => void;
};

export function ListItem({
  image = null,
  title,
  content,
  time,
  onClick = () => {},
}: listProps) {
  return (
    <TouchableOpacity style={styles.listContainer} onPress={onClick}>
      <View
        style={{
          width: 54,
          height: 54,
          borderRadius: 50,
        }}
      >
        {image ? (
          <Image
            style={{ width: 54, height: 54, borderRadius: 50 }}
            source={image}
          />
        ) : (
          <View style={{ width: 54, height: 54, borderRadius: 50, backgroundColor: '#D9D9D9' }} />
        )}
      </View>

      <View
        style={{
          marginLeft: 10,
          flex: 1,
          marginRight: 'auto',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 700 }}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 400, color: '#828282' }}>{content}</Text>
        </View>
      </View>

      // 시간
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
      title: '하트를 받았어요',
      content:
        '감자탕님에게 하트를 받았어요❤️ \n' +
        '지금 바로 프로필을 확인해 보세요!',
      time: '지금',
    },
    {
      image: '',
      title: '프로필을 수정해 주세요!',
      content:
        '사진을 심사 기준에 맞게 수정해 주세요. \n' +
        '클릭하면 수정 화면으로 이동합니다',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      title: '하트를 받았어요',
      content:
        '감자탕님에게 하트를 받았어요❤️ \n' +
        '지금 바로 프로필을 확인해 보세요!',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      title: '하트를 받았어요',
      content:
        '감자탕님에게 하트를 받았어요❤️ \n' +
        '지금 바로 프로필을 확인해 보세요!',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      title: '하트를 받았어요',
      content:
        '감자탕님에게 하트를 받았어요❤️ \n' +
        '지금 바로 프로필을 확인해 보세요!',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      title: '하트를 받았어요',
      content:
        '감자탕님에게 하트를 받았어요❤️ \n' +
        '지금 바로 프로필을 확인해 보세요!',
      time: '지금',
    },
    {
      image: require('../../../../assets/sample-profile2.jpg'),
      title: '하트를 받았어요',
      content:
        '감자탕님에게 하트를 받았어요❤️ \n' +
        '지금 바로 프로필을 확인해 보세요!',
      time: '지금',
    },
  );
}
