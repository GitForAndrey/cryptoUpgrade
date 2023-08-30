import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './style';

export const FiltersItem = React.memo(
  ({ item, isActive, handleFilterClick }) => {
    return (
      <TouchableOpacity
        onPress={() => handleFilterClick(item.id)}
        style={[styles.container, isActive && styles.activeContainer]}>
        <Text style={[styles.text, isActive && styles.activeText]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  },
);
