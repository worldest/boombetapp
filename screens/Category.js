import React, { useEffect } from 'react';
import { AsyncStorage, StyleSheet, Alert, Modal, Text, TouchableOpacity, ImageBackground, ScrollView, View } from 'react-native';
import CategoriesBlock from '../components/Block/Categories';
import VerticalProductView from '../components/Block/VerticalProductView';
import UiText from '../components/UI/Text';
import UiView from '../components/UI/View';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../constants/COLORS';
import { useSelector } from 'react-redux';
import OfferBlock from '../components/Block/Offer';
import UiAlert from '../components/UI/Alert';
import { useState } from 'react';
// var ScrollableTabView = require('react-native-scrollable-tab-view');
// var MaskTabBar = require('react-native-scrollable-tab-view-mask-bar');
const Products = ({ navigation }) => {
  
  const [fullname, setFullname] = useState(null);
  const [payment, setPayment] = useState(<View></View>);
  const [ref, setRef] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [pay, setPay] = useState(true);
  const [category, setCategory] = useState("");
  const [popularProducts, setPopularProducts] = useState([]);
  
  useEffect(() => {
    AsyncStorage.getItem("cat").then((cat) => {
      
    })
    fetch(`https://getintellisoft.com/app/apis/allTips.php`, {
        method: "GET"
      })
      .then(response => response.json())
      .then((data) => {
        setPopularProducts(data);
        setCategory(cat)
      })
      .catch((error) => {
        
      })
    setRef(Math.floor(Math.random() * 1000000000));
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
          setFullname(data.fullname);
          setPhone(data.phone);
          setEmail(data.email)
          if(data.status === "Regular"){
            AsyncStorage.getItem("cat").then((cat) => {
              
              if(cat === "Free Tips"){
                setPay(false);
              }else{
                
                Alert.alert("Information", "This page or category is for VIP Members only. Please subscribe to gain access");
              }
            })
            
            
          }else if(data.status === "None"){
            Alert.alert("Error", "An error occurred, please login again")
            setAuth(true);
          }else if(data.status === "VIP Member"){
            setPay(false);
          }
        })
        .catch((error) => {
  
        })
      }
    })
  }, [])
  return (
    <View style={styles.view}>
      <Modal
        visible={pay}
        transparent={true}
        animationType="fade"
        onRequestClose={() =>
        {
          navigation.navigate("Products")
        }}
        >
          <View style={{width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 1)", flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
            {
              fullname === null ?
              <Text style={{padding: 10, fontSize: 16,}}>Please Wait</Text>
              :
              <>
                <AntDesign name="creditcard" color="#c4c5c6" size={60}></AntDesign>
            <Text style={{padding: 10, fontSize: 16,}}>Upgrade your account</Text>
            <Text style={{padding: 10, fontSize: 14,}}>Upgrade to a VIP Member to gain access to our tips</Text>
            <TouchableOpacity onPress={() => {
                setPayment(
                  <Paystack                          
                    buttonText= {
                      <Text style={{fontWeight: "bold", color: "#fff", fontSize: 20, alignSelf: "center"}}>Upgrade Now - NGN 10,000</Text>
                  }
                    showPayButton={true}
                    paystackKey={pkey}                                           
                    amount="10000"
                    billingEmail={email}
                    style={{alignSelf: "center"}}
                    autoStart={true}
                    //pk_live_b36a37019aa700156af2f15fc5d91d46f97a35c5
                    //pk_test_4cb1460597ab6e0530fc05c054378352749fcbea
                    billingMobile={phone}
                    billingName={fullname}
                    refNumber= {ref}
                    ActivityIndicatorColor="black"
                    //SafeAreaViewContainer=
                    //SafeAreaViewContainerModal=
                    onCancel={(e) => {
                    // handle response here
                    setPayment(<View></View>)
                    }}
                    onSuccess={(res) => {
                        
                      fetch('https://getintellisoft.com/app/apis/upgrade.php?email='+userData.email)
                      .then(res => res.json())
                      .then(Data => {
                      //var serverReps = Data.Result.message;  
                      console.log(Data);                                           
                      setPayment(<View></View>)
                      return refresh();
                      }).catch(error => console.error(error))
                        
                    }}
                />
                )
              }}  style={{backgroundColor: "#000", alignContent: "center", alignSelf: "center", width: 300, marginVertical: 30, padding: 15, borderRadius: 5}}>
                <Text style={{fontWeight: "bold", color: "#fff", fontSize: 20, alignSelf: "center"}}>Upgrade Now - NGN 10,000</Text>
                  
                
              </TouchableOpacity>
              {payment}
              </>
            }
            
          </View>
        </Modal>
      <UiView style={styles.screen}>
        <View style={styles.head}>
          <UiText style={styles.heading}>BoomBet Tips</UiText>

        </View>
        {/* <ScrollableTabView renderTabBar={() => <MaskTabBar someProp={'here'} showMask={true} maskMode='light' />}>
              <VerticalProductView
              data={popularProducts}
              navigation={navigation} 
              headTitle="Trending" tabLabel="Yesterday" />
              <VerticalProductView
              data={popularProducts}
              navigation={navigation} 
              headTitle="Trending" tabLabel="Today" />
              <VerticalProductView
              data={popularProducts}
              navigation={navigation} 
              headTitle="Trending" tabLabel="Tomorrow" />
            </ScrollableTabView> */}
        <ImageBackground
          source={require("../assets/kick.jpg")}
          style={{objectFit: "cover", flex: 1, height: "100%"}}
          resizeMode="cover"
          >
            
          <ScrollView style={{width: "100%", height: "100%"}}>
            <VerticalProductView
              data={popularProducts}
              navigation={navigation} 
              headTitle="Trending"
            />
          </ScrollView>
        </ImageBackground>
      </UiView>
      <UiAlert />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flex: 1,
    height: "100%",
    backgroundColor: "#72116d00"
  },
  screen: {
    paddingTop: 60,
    backgroundColor: "#72116d00",
    flex: 1,
    height: "100%"
  },
  head: {
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 25,
    fontFamily: 'Nunito-Bold',
    color: COLORS.primaryColor,
    marginVertical: 10
  },
  subHeading: {
    fontSize: 16,
    color: COLORS.textColorLight,
  },
  empty: {
    minHeight: 60,
  },
});

export default Products;
