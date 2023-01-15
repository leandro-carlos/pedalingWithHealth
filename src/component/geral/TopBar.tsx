import React, {createRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import Icon from 'react-native-vector-icons/Ionicons';

export default function TopBar({hasBackButton, navigation}) {
  interface Props {
    hasBackButton: boolean;
  }
  return (
    <View style={styles.header}>
      {hasBackButton ? (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={28} color={'#181818'} />
        </Pressable>
      ) : null}

      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 19, color: '#181818'}}>PEDALADA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    height: verticalScale(65),
  },
});
