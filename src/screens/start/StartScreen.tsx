import ROUTES from '../../constants/routes';

function StartScreen({ navigation }: any) {
  function navigateToLoginScreen() {
    // navigation.navigate(ROUTES.LOGIN);
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.LOGIN }],
    });
  }

  return (
    navigateToLoginScreen()
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
