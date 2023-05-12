import React from 'react';
import { StyleSheet,ScrollView, TouchableOpacity, Pressable, View, AsyncStorage, Modal, Alert, Text, Linking } from 'react-native';
import CategoriesBlock from '../components/Block/Categories';
import { LinearGradient } from 'expo-linear-gradient';
import HorizontalProductView from '../components/Block/HorizontalProductView';
import UiText from '../components/UI/Text';
import UiView from '../components/UI/View';
import VerticalProductView from '../components/Block/VerticalProductView';
import {Input} from 'galio-framework'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../constants/COLORS';
import {Paystack} from "react-native-paystack-webview";
import * as WebBrowser from 'expo-web-browser';
import { useSelector } from 'react-redux';
import OfferBlock from '../components/Block/Offer';
import UiAlert from '../components/UI/Alert';
import { useState, useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Animatable from 'react-native-animatable';

const News = ({ navigation }) => {
  const [popularProducts, setPopularProducts] = useState([]);  
  const [popularProduct, setPopularProduct] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pay, setPay] = useState(false);
  const [member, setMember] = useState("Regular");
  const [payment, setPayment] = useState(<View></View>);
  const [authenticate, setAuthenticate] = useState(null);
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    expiry: "",
    phone: "",
    status: "",
    password: "",
    created_at: ""
  })
  const [ref, setRef] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loginText, setLoginText] = useState("Login");
  const [RegisterText, setRegisterText] = useState("Register");
  const [pkey, setPkey] = useState("");
  // AsyncStorage.removeItem("isLoggedIn")
  useEffect(() => {
    fetch("https://getintellisoft.com/app/apis/allTips.php?category=Free Tips", {
    method: "GET"
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    setPopularProduct(data)
  })
    AsyncStorage.getItem("isLoggedIn").then((isLoggedIn) => {
      if(isLoggedIn === null || isLoggedIn === undefined){
        // setAuth(true);
        // setLoading(false)
        navigation.navigate("Landing")
      }else{
        fetch(`https://getintellisoft.com/app/apis/getUser.php?email=${isLoggedIn}`, {
          method: "GET"
        })
        .then(response => response.json())
        .then((data) => {
          setUserData(data)
          console.log(data);
          if(data.status === "Regular"){
            setAuth(false);
            setLoading(false)
          }else if(data.status === "None"){
            Alert.alert("Error", "An error occurred, please login again")
            setAuth(true);
          }else if(data.status === "VIP Member"){
            setAuth(false);
            setLoading(false)
          }
        })
        .catch((error) => {
  
        })
      }
    })
    fetch("https://getintellisoft.com/app/apis/paystack.php", {
      method: "GET"
    })
    .then(response => response.json())
    .then((data) => {
      setPkey(data.key)

    })
    AsyncStorage.getItem("loginFaster").then((loginFaster) => {
      if(loginFaster !== null && loginFaster !== undefined){
        let options = {
          promptMessage: "App Lock settings",
          cancelLabel: "Cancel"
        }
        LocalAuthentication.authenticateAsync(options).then((res) => {
          console.log(res)
          var success = res.success;
          if(success === true){
              
          }else{
            setAuthenticate(true);
          }
        })
      }
    })
    setRef(Math.floor(Math.random() * 1000000000))
  
  fetch("https://getintellisoft.com/app/apis/allNews.php", {
    method: "GET"
  })
  .then(response => response.json())
  .then((data) => {
    setPopularProducts(data)
  })
  .catch((error) => {

  })
  AsyncStorage.getItem("isLoggedIn").then((isLoggedIn) => {
    if(isLoggedIn === null || isLoggedIn === undefined){
      setAuth(true);
      setLoading(false)
    }else{
      fetch(`https://getintellisoft.com/app/apis/getUser.php?email=${isLoggedIn}`, {
        method: "GET"
      })
      .then(response => response.json())
      .then((data) => {
        setUserData(data)
        console.log(data);
        setFullname(data.fullname);
        setPhone(data.phone);
        setEmail(data.email)
        if(data.status === "Regular"){
          
        }else if(data.status === "None"){
          
        }else if(data.status === "VIP Member"){
          
        }
      })
      .catch((error) => {

      })
    }
  })
}, [])

const refresh = () => {
  AsyncStorage.getItem("isLoggedIn").then((isLoggedIn) => {
    if(isLoggedIn === null || isLoggedIn === undefined){
      setAuth(true);
      setLoading(false)
    }else{
      fetch(`https://getintellisoft.com/app/apis/getUser.php?email=${isLoggedIn}`, {
        method: "GET"
      })
      .then(response => response.json())
      .then((data) => {
        setUserData(data)
        console.log(data);
        if(data.status === "Regular"){
          setAuth(false);
          setLoading(false)
        }else if(data.status === "None"){
          Alert.alert("Error", "An error occurred, please login again")
          setAuth(true);
        }else if(data.status === "VIP Member"){
          setAuth(false);
          setLoading(false)
        }
      })
      .catch((error) => {

      })
    }
  })
  fetch("https://getintellisoft.com/app/apis/allNews.php", {
    method: "GET"
  })
  .then(response => response.json())
  .then((data) => {
    setPopularProducts(data)
  })
  .catch((error) => {

  })
}
  return (
    <View style={styles.view}>
      <UiView style={styles.screen}>
        <View style={styles.head}>
          <UiText style={styles.heading}>BoomBet News</UiText>
          <UiText style={styles.subHeading}>Latest Sport News</UiText>
        </View>
        
          
        <HorizontalProductView
          data={popularProducts}
          navigation={navigation} 
          headTitle="Sport News"
        />
        <View style={styles.empty}></View>
      </UiView>
      <UiAlert />
      
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flex: 1,
    backgroundColor: "#000000"
  },
  screen: {
    paddingTop: 50,
    backgroundColor: "#000"
  },
  head: {
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 25,
    
    fontFamily: 'Nunito-Bold',
    color: "#fff",
  },
  subHeading: {
    fontSize: 16,
    color: "#fff",
  },
  empty: {
    minHeight: 60,
  },
  offer: {
    paddingHorizontal: 15,
    height: 70,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
  },
  offerText: {
    color: "#A1EA35",
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

export default News;
