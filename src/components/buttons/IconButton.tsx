import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  iconName: string;
  color: string;
  size: number;
  onClick: () => void;
};

function IconButton({ iconName, color, size, onClick }: Props) {
  return (
    <TouchableOpacity onPress={() => {onClick()}}>
      <Icon name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
}

export default IconButton;
