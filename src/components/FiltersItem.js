import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

export const FiltersItem = React.memo(
  ({ item, isActive, handleFilterOnPress }) => {
    return (
      <TouchableOpacity
        onPress={() => handleFilterOnPress(item.id)}
        style={[styles.container, isActive && styles.activeContainer]}>
        <Text style={[styles.text, isActive && styles.activeText]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
    height: 20,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  text: {
    ...FONTS.textRegular,
    color: COLORS.tabBottomGray,
  },
  activeContainer: {
    backgroundColor: COLORS.white,
  },
  activeText: {
    color: COLORS.mainBg,
  },
});
