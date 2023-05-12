import React, { useEffect } from 'react';
import { ImageBackground, ScrollView, Modal, Text, TouchableOpacity, AsyncStorage, StyleSheet, View, Alert } from 'react-native';
import CategoriesBlock from '../components/Block/Categories';
import VerticalProductView from '../components/Block/VerticalProductView';
import UiText from '../components/UI/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UiView from '../components/UI/View';
import CartHeaderBlock from '../components/Block/CartHeader'
import COLORS from '../constants/COLORS';
import { useSelector } from 'react-redux';
import OfferBlock from '../components/Block/Offer';
import UiAlert from '../components/UI/Alert';
import { useState } from 'react';
const Products = ({ navigation }) => {
  const [pay, setPay] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [payment, setPayment] = useState(<View></View>);
  const [ref, setRef] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [popularProducts, setPopularProducts] = useState([]);
  
  useEffect(()=>{
    
    setRef(Math.floor(Math.random() * 1000000000))
    
    fetch("https://getintellisoft.com/app/apis/allTips.php", {
    method: "GET"
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    setPopularProducts(data)
  })
  .catch((error) => {
    
  })
  }, [])
  return (
    <View style={styles.view}>
      
      
      <CartHeaderBlock navigation={navigation} />
      <UiView style={styles.screen}>
        <View style={styles.head}>
          <UiText style={styles.heading}>BoomBet Tip</UiText>
          <UiText style={styles.subHeading}>Select Tip Category</UiText>
        </View>
        <CategoriesBlock navigation={navigation} />
      </UiView>
      <UiAlert />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flex: 1,
    backgroundColor: "#72116d"
  },
  screen: {
    paddingTop: 50,
    backgroundColor: "#72116d"
  },
  head: {
    paddingHorizontal: 15,
    marginTop: 40,
    color: "#72116d30"
  },
  heading: {
    fontSize: 25,
    fontFamily: 'Nunito-Bold',
    color: "#eee"
  },
  subHeading: {
    fontSize: 16,
    color: "#eee"
  },
  empty: {
    minHeight: 60,
  },
});

export default Products;
