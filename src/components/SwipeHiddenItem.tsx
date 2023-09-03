import React,{FunctionComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../constants';
import { WithWishlistCoin } from '../types/coinTypes';

interface SwipeHiddenItemProps {
  item:WithWishlistCoin,
  handleOnPress:(() => void | undefined),
  color:string,
  iconName:string,
  title:string,
  isWalletPage:boolean,
}

export const SwipeHiddenItem:FunctionComponent<SwipeHiddenItemProps> = ({
  item, handleOnPress, color, iconName,  title  ,isWalletPage
}) => {
  let dispatch = useDispatch();
  return (
    <TouchableOpacity
    onPress={() => dispatch(handleOnPress(item))}
    style={[
      styles.rightAction,
      { backgroundColor: color, height: isWalletPage ? 75 : 55 },
    ]}
    activeOpacity={0.8}>
    <Icon name={iconName} size={24} style={styles.icon} />
    <Text style={styles.text}>{ title}</Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    position: 'absolute',
    right: 0,
    borderRadius: SIZES.radius + 1,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS.white,
  },
  text: {
    ...FONTS.textRegular,
  },
});
