import React from 'react';
import { Pressable, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../constants/COLORS';
import UiButton from '../UI/Button';
import UiText from '../UI/Text';
import ProductCardBlock from './CategoryCard';

const HorizontalProductView = ({ type, data, headTitle, navigation }) => {
  return (
    <View style={Styles.container}>
      <ScrollView
        style={Styles.dataSec}
      >
        
        { 
        data.length > 0 ?
        data.slice(0, 15).map((product, index) => (
          // <Pressable
          //   key={product.id}
          //   onPress={() =>
          //     navigation.navigate('ProductDetail', {
          //       productData: product,
          //     })
              
          //   }
          // >
            <ProductCardBlock key={index} data={product} type={type} />
          // </Pressable>
        ))
        :
        <View
          style={{width: 90, height: 90, borderRadius: 500, overflow: "hidden", alignSelf: "center"}}
        >
          <Image 
            source={{uri: "https://assets.materialup.com/uploads/805362d3-e9d6-4aa7-b314-ed9dde22558b/preview.gif"}} 
            style={{width: 90, height: 90, borderRadius: 500, overflow: "hidden", alignSelf: "center"}}
            resizeMode="cover"
          />
          <Text style={{fontFamily: "Poppins", alignSelf: "center", marginVertical: 20, color: "#000", fontSize: 15}}>No Data</Text>
        </View>
        
    
    }
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 10,
    
  },
  head: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: COLORS.primaryColor,
  },
  dataSec: {
    marginTop: 20,
    marginBottom: 10
  },
});

export default HorizontalProductView;
