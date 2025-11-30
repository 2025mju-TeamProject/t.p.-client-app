import ROUTES from '../../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from '../../constants/routes';

function StartScreen({ navigation }: any) {
  async function handleNavigate() {
    let route
    // if(await AsyncStorage.getItem('accessToken')){
    //   route = ROUTES.WRITEPROFFILE;
    // } else {
    //   route = ROUTES.HOME;
    // }
    navigation.reset({
      index: 0,
      // routes: [{ name: route }],
      routes: [{ name: ROUTES.LOGIN }],
    });
  }

  return (
    handleNavigate()
  );
}

export default StartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
// });
