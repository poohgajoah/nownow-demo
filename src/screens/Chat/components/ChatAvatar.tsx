import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {useAppTheme} from '../../../theme/ThemeProvider';

// 채팅 머리의 캐릭터 얼굴. 홈 캐릭터(frame0)의 얼굴 부분만 잘라 둔 그림.
const avatarImage = require('../../../assets/images/character/avatar.png');

export default function ChatAvatar() {
  const {theme} = useAppTheme();

  return (
    <View style={[styles.avatar, {backgroundColor: theme.accentMuted}]}>
      <Image source={avatarImage} resizeMode="cover" style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 20,
    height: 40,
    overflow: 'hidden',
    width: 40,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
