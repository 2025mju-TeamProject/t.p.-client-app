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
  rowSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    color: 'black',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#9c9c9c'
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