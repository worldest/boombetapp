import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import COLORS from '../../constants/COLORS';
import UiText from '../UI/Text';

const OfferBlock = ({data, headTitle, navigation}) => {
  return (
    <View style={styles.offerBox}>
      
          <Pressable
            onPress={() =>
              {
                Linking.openURL("https://t.me/+mgKequZCD8ExOGQ8");
              }
            }
          >
          <LinearGradient
            colors={["#0064ba", COLORS.blueLight]}
            start={{ x: 0.9, y: 0.3 }}
            style={{marginVertical: 10, ...styles.offer}}
          >
            <UiText style={styles.offerText}>Join Our Telegram</UiText>
            <UiText style={styles.offerCodeText}>
              Go to Telegram
            </UiText>
            
          </LinearGradient>
          </Pressable>
          
    </View>
  );
};

const styles = StyleSheet.create({
  offerBox: {
    marginHorizontal: 15,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  offer: {
    paddingHorizontal: 15,
    height: 70,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
  },
  offerText: {
    color: COLORS.white,
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
  },
  offerCodeText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    color: COLORS.white,
  },
  giftBox: {
    position: 'absolute',
    maxHeight: 80,
    maxWidth: 80,
    left: 0,
  },
});

export default OfferBlock;
