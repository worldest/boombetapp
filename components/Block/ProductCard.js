import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import COLORS from '../../constants/COLORS';
import { getTag } from '../../utilities/tag';
import UiIconButton from '../UI/IconButton';
import UiText from '../UI/Text';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/actions/cartActions';

const ProductCardBlock = ({ data }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <View style={Styles.container}>
      <View style={Styles.imageSec}>
        <ImageBackground
          source={{ 
            uri: data.image,
          }}
          resizeMode="center"
          style={Styles.productImage}
        />
      </View>
      <View style={Styles.infoSec}>
        <UiIconButton
          style={Styles.addToBag}
          onPress={() => {
            
          }}
        >
          <MaterialIcons name="list" size={23} color="white" />
        </UiIconButton>
        <UiText style={Styles.price}>{data.title}</UiText>
        <UiText style={Styles.title}>{data.description.substring(0, 40)}...</UiText>
        <View style={Styles.subInfo}>
          <UiText style={Styles.tag}>{getTag(data.category)}</UiText>
          
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "#000",
    position: 'relative',
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 15,
    marginVertical: 5,
  },
  imageSec: {
    width: '50%',
    borderRadius: 30,
    justifyContent: "center",
    borderRadius: 20,
    overflow: 'hidden',
    height: 150
  },

  productImage: {
    height: '100%',
    width: '100%',
    overflow: "hidden",
    borderRadius: 30
  },

  infoSec: {
    paddingTop: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
    width: "50%",
    position: 'relative',
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    fontWeight: "200", marginTop: 5,
    color: "#fff"
  },

  subInfo: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    color: "#fff",
    justifyContent: 'space-between',
  },

  tag: {
    fontSize: 14,
    color: COLORS.textColorLight,
    fontFamily: 'Nunito-SemiBold',
  },
  price: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: COLORS.white,
  },

  addToBag: {
    position: 'absolute',
    right: 20,
    top: -20,
    height: 40,
    width: 40,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    elevation: 5,
  },
});

export default ProductCardBlock;
