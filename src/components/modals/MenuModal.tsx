import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../constants/colors';

type option = {
  text: string;
  onClick: () => void;
};

type Props = {
  options: Array<option>;
  cancle: () => void;
};

function MenuModal({ options, cancle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        {
          options.map(
            option => (
              <TouchableOpacity key={option.text} onPress={() => {option.onClick()}} style={styles.optionButtons} >
                <Text style={{ color: 'black' }}>{option.text}</Text>
              </TouchableOpacity>
            )
          )
        }
      </View>

      <TouchableOpacity
        onPress={() => {
          cancle();
        }}
        style={styles.button}
      >
        <Text style={{ color: 'black' }}>취소</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MenuModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 9,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  subTitle: {
    fontSize: 13,
  },
  optionButtons: {
    width: '100%',
    height: 44,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray,
  },
  button: {
    width: '100%',
    height: 44,
    backgroundColor: colors.white,
    borderRadius: 9,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
