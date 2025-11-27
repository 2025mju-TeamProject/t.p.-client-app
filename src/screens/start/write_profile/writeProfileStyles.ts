import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  section: {
    width: width,
    height: 'auto',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  columnSection: {
    width: width,
    height: 'auto',
    paddingHorizontal: 24,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: 'black',
    fontFamily: 'SCDream7',
    lineHeight: 34,
    letterSpacing: -1.7,
  },
  subTitle: {
    fontSize: 12,
    lineHeight: 17,
    color: '#979797',
    fontFamily: 'NanumSquareR',
  },
  text: {
    fontSize: 12,
    fontWeight: 400,
    color: 'black'
  },
  boldText: {
    fontSize: 12,
    fontWeight: 800,
    color: 'black'
  }
})