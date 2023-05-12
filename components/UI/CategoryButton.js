import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import COLORS from '../../constants/COLORS';
import UiText from './Text';
import * as Animatable from 'react-native-animatable';

const UiCategoryButton = ({ data, style, onPress, textStyle }) => {
  const ProductIcon = ({ name }) => {
    switch (name) {
      case `men's clothing`:
        return (
          <Image
            source={require('../../assets/images/ball.png')}
            style={Styles.icons}
          />
        );
      case `women's clothing`:
        return (
          <Image
            source={require('../../assets/images/ball.png')}
            style={{ ...Styles.icons, height: 16, width: 16 }}
          />
        );
      case 'electronics':
        return (
          <Image
            source={require('../../assets/images/ball.png')}
            style={Styles.icons}
          />
        );
      default:
        return (
          <Image
            source={require('../../assets/images/ball.png')}
            style={Styles.icons}
          />
        );
    }
  };
  return (
    <Animatable.View animation="bounceInUp" style={{ ...Styles.button, ...style }}>
    <Pressable onPress={onPress} >
      <ProductIcon name={data.name} />
      <UiText style={{ ...Styles.text, ...textStyle }}>{data.name}</UiText>
    </Pressable>
    </Animatable.View>
  );
};

const Styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "48%",
    height: 120
  },
  text: {
    color: COLORS.primaryColor,
    fontFamily: 'Nunito-SemiBold',
    marginVertical: 10
  },
  icons: {
    height: 20,
    width: 20,
  },
});

export default UiCategoryButton;
