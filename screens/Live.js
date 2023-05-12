import React from 'react';
import { StyleSheet,ScrollView, TouchableOpacity, Pressable, View, Image, AsyncStorage, Modal, Alert, Text, Linking, ImageBackground } from 'react-native';
import CategoriesBlock from '../components/Block/Categories';
import { LinearGradient } from 'expo-linear-gradient';
import HorizontalProductView from '../components/Block/HorizontalProductView';
import UiText from '../components/UI/Text';
import UiView from '../components/UI/View';
import VerticalProductView from '../components/Block/VerticalProductView';
import {Input} from 'galio-framework'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import COLORS from '../constants/COLORS';
import {Paystack} from "react-native-paystack-webview";
import * as WebBrowser from 'expo-web-browser';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import OfferBlock from '../components/Block/Offer';
import UiAlert from '../components/UI/Alert';
import { useState, useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'react-native-google-mobile-ads';
const Live = ({ navigation }) => {
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
  const h = Dimensions.get("screen").height;
  const [loginText, setLoginText] = useState("Login");
  const [RegisterText, setRegisterText] = useState("Register");
  const [pkey, setPkey] = useState("");
  // AsyncStorage.removeItem("isLoggedIn")
  useEffect(() => {
    fetch("https://getintellisoft.com/app/apis/allLives.php", {
    method: "GET"
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    setPopularProduct(data)
  })
  
  //   AsyncStorage.getItem("isLoggedIn").then((isLoggedIn) => {
  //     if(isLoggedIn === null || isLoggedIn === undefined){
  //       // setAuth(true);
  //       // setLoading(false)
  //       navigation.navigate("Landing")
  //     }else{
  //       fetch(`https://getintellisoft.com/app/apis/getUser.php?email=${isLoggedIn}`, {
  //         method: "GET"
  //       })
  //       .then(response => response.json())
  //       .then((data) => {
  //         setUserData(data)
  //         console.log(data);
  //         if(data.status === "Regular"){
  //           setAuth(false);
  //           setLoading(false)
  //         }else if(data.status === "None"){
  //           Alert.alert("Error", "An error occurred, please login again")
  //           setAuth(true);
  //         }else if(data.status === "VIP Member"){
  //           setAuth(false);
  //           setLoading(false)
  //         }
  //       })
  //       .catch((error) => {
  
  //       })
  //     }
  //   })
  //   fetch("https://getintellisoft.com/app/apis/paystack.php", {
  //     method: "GET"
  //   })
  //   .then(response => response.json())
  //   .then((data) => {
  //     setPkey(data.key)

  //   })
  //   AsyncStorage.getItem("loginFaster").then((loginFaster) => {
  //     if(loginFaster !== null && loginFaster !== undefined){
  //       let options = {
  //         promptMessage: "App Lock settings",
  //         cancelLabel: "Cancel"
  //       }
  //       LocalAuthentication.authenticateAsync(options).then((res) => {
  //         console.log(res)
  //         var success = res.success;
  //         if(success === true){
              
  //         }else{
  //           setAuthenticate(true);
  //         }
  //       })
  //     }
  //   })
  //   setRef(Math.floor(Math.random() * 1000000000))
  
  // fetch("https://getintellisoft.com/app/apis/allNews.php", {
  //   method: "GET"
  // })
  // .then(response => response.json())
  // .then((data) => {
  //   setPopularProducts(data)
  // })
  // .catch((error) => {

  // })
  // AsyncStorage.getItem("isLoggedIn").then((isLoggedIn) => {
  //   if(isLoggedIn === null || isLoggedIn === undefined){
  //     setAuth(true);
  //     setLoading(false)
  //   }else{
  //     fetch(`https://getintellisoft.com/app/apis/getUser.php?email=${isLoggedIn}`, {
  //       method: "GET"
  //     })
  //     .then(response => response.json())
  //     .then((data) => {
  //       setUserData(data)
  //       console.log(data);
  //       setFullname(data.fullname);
  //       setPhone(data.phone);
  //       setEmail(data.email)
  //       if(data.status === "Regular"){
          
  //       }else if(data.status === "None"){
          
  //       }else if(data.status === "VIP Member"){
          
  //       }
  //     })
  //     .catch((error) => {

  //     })
  //   }
  // })
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
          <UiText style={{...styles.heading, alignSelf: "center", marginTop: 50, fontFamily: "Poppins-Bold"}}>BoomBet</UiText>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", padding: 20, }}>
          <View style={{width: "55%", justifyContent: "center"}}>
            <View style={{width: "95%", justifyContent: "center", alignSelf: "center", flexDirection: "row", height: 50, overflow: "hidden", borderRadius: 30, backgroundColor: "#212329"}}>
              <TextInput
                placeholder='Search'
                placeholderTextColor={"#fff"}
                style={{height: 50, paddingHorizontal: 20, width: "80%", color: "#fff", fontSize: 15, fontWeight: "bold", fontFamily: "Nunito"}}
              />
              <AntDesign name="search1" size={24} color="#fff" style={{marginTop: 10}} />
            </View>
          </View>
          <View style={{width: "45%", justifyContent: "center"}}>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://t.me/BOOMBET201");
              }}
            >
              <View style={{width: "100%", paddingHorizontal: 20, justifyContent: "center", alignSelf: "center", flexDirection: "row", height: 50, overflow: "hidden", borderRadius: 30, backgroundColor: "#212329"}}>
                <View style={{width: "70%", justifyContent: "center"}}>
                  <Text style={{color: "#fff", fontSize: 15}}>Join</Text>
                </View>
                <View style={{width: "30%", justifyContent: "center"}}>
                  <FontAwesome name="telegram" size={20} color="#28a8e9" style={{marginTop: 0}} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
          {/* <Pressable
            onPress={() =>
              {
                setPay(true)
              }
            }
          >
          <LinearGradient
            colors={["#00000040", "#72116d"]}
            start={{ x: 0.9, y: 0.3 }}
            style={{marginVertical: 10, ...styles.offer}}
          >
            <UiText style={styles.offerText}>{
              userData.status === "Regular" ? "Subscribe to VIP" : `Expiry: ${userData.expiry}`
            }</UiText>
            <UiText style={styles.offerCodeText}>
              Account Type: {userData.status}
            </UiText>
            
          </LinearGradient>
          </Pressable> */}
          {/* <UiText style={{...styles.heading, marginLeft: 20}}>Get deposit bonus</UiText> */}
          {/* <Animatable.View animation="fadeInDown" style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 20, width: "95%", alignSelf: "center"}}>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80",  alignContent: "center", paddingVertical: 10, alignItems: "center",borderRadius: 10}}>
                    <TouchableOpacity onPress={() => {
                      Linking.openURL("https://bit.ly/3fkyrlm");
                    }}>
                    <Image source={require("../assets/1xbet.png")} style={{width: 40, height: 40, alignSelf: "center"}} />
                    <Text animation="fadeInUp" style={{fontSize: 16, marginVertical: 5, alignSelf: "center", fontWeight: "900", color: "#fff"}}>BOOMBET201</Text>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Register 1xBet</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80", paddingVertical: 10, alignContent: "center", alignItems: "center", borderRadius: 10}}>
                  <TouchableOpacity onPress={() => {
                      Linking.openURL("https://cutt.ly/BOOMBET");
                    }}>
                    <Image source={require("../assets/22bet.png")} style={{width: 40, height: 40, alignSelf: "center"}} />
                    <Text animation="fadeInUp" style={{fontSize: 16, marginVertical: 5, alignSelf: "center", fontWeight: "900", color: "#fff"}}>N/A</Text>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Register 22Bet</Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80", paddingVertical: 10, alignContent: "center", alignItems: "center", borderRadius: 10}}>
                  <TouchableOpacity onPress={() => {
                      Linking.openURL("https://paripesa.bet/boombet201");
                    }}>
                    <Image source={require("../assets/pari.png")} style={{width: 40, height: 40, alignSelf: "center"}} />
                    <Text animation="fadeInUp" style={{fontSize: 16, marginVertical: 5, alignSelf: "center", fontWeight: "900", color: "#fff"}}>BOOMBET201</Text>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Register Paripesa</Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: "49%", justifyContent: "center", marginTop: 20}}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("News")
                    }} style={{borderWidth: 1, borderColor: "#fff", paddingVertical: 15, borderRadius: 10, width: "100%"}}>
                        <Text style={{color: "#fff", fontSize: 14, fontWeight: "900", alignSelf: "center"}}>Sport News</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: "49%", justifyContent: "center", marginTop: 20}}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://t.me/BOOMBET201")
                    }} style={{borderWidth: 1, backgroundColor: "#0064ba", borderColor: "#7f0e79", paddingVertical: 15, borderRadius: 10, width: "100%"}}>
                        <Text style={{color: "#fff", fontSize: 14, fontWeight: "900", alignSelf: "center"}}>Join Telegram</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View> */}
            {/* <UiText style={{paddingLeft: 20, fontSize: 12, ...styles.heading}}>Free Tips</UiText> */}
            
            <UiView style={{height: h - 100, backgroundColor: "#fff"}}>
            
              <View style={{flexDirection: "row", marginTop: 20, width: "100%", paddingHorizontal: 20, justifyContent: "space-between"}}>
                <View style={{width: "80%", justifyContent: "center"}}>
                    <Text style={{fontSize: 25, fontFamily: "Poppins-Bold"}}>Live Matches</Text>
                </View>
                <View style={{width: "20%", justifyContent: "center"}}>
                  <TouchableOpacity>
                    {/* <Text style={{fontSize: 25, fontFamily: "Poppins-Bold"}}>More</Text> */}
                  </TouchableOpacity>
                </View>
              </View>
                <VerticalProductView
                  data={popularProduct}
                  navigation={navigation} 
                  headTitle="Trending"
                />
            </UiView>
            
       
        
        <View style={styles.empty}></View>
      </UiView>
      <UiAlert />
      <Modal
        visible={pay}
        transparent={true}
        animationType="fade"
        onRequestClose={() =>
        {
          setPay(false)
        }}
        >
          <ImageBackground source={require("../assets/back.gif")} style={{width: "100%", height: "100%", backgroundColor: "#7f0e79", flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
            {
              fullname === null ?
              <Text style={{padding: 10, fontSize: 16,}}>Please Wait</Text>
              :
              <>
                <AntDesign name="Trophy" color="#c4c5c6" size={60}></AntDesign>
            <Text style={{padding: 10, fontSize: 16, color: "#fff"}}>Upgrade your account</Text>
            <Text style={{padding: 10, fontSize: 14, color: "#fff"}}>Upgrade to a VIP Member to gain access to our tips</Text>
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
              }}  
              style={{backgroundColor: "transparent", borderWidth: 1, borderColor: "#ffffff60", alignContent: "center", alignSelf: "center", width: 350, borderTopRightRadius: 30, height: 60, justifyContent: "center", padding: 15, borderRadius: 5}}
                    
              >
                <Text style={{fontWeight: "bold", color: "#fff", fontSize: 20, alignSelf: "center"}}>Upgrade Now - NGN 10,000</Text>
                  
                
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>
        {
          setPay(false)
        }}>
                <Text style={{fontWeight: "900", color: "#fff", marginVertical: 20, fontSize: 20}}>Close</Text>
              </TouchableOpacity>
              {payment}
              </>
            }
            
          </ImageBackground>
        </Modal>
      <Modal
        visible={false}
        transparent={true}
        animationType="fade"
        >
          <View style={{width: "100%", height: "100%", backgroundColor: "#7f0e79", flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
            <Animatable.Image animation="bounceInLeft" iterationCount="infinite" source={require("../assets/icon.png")} style={{alignSelf: "center", width: 200, height: 200}} />
          </View>
        </Modal>

            <Modal
        visible={authenticate}
        transparent={true}
        animationType="fade"
        >
          <View style={{width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 1)", flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
            <AntDesign name="lock" color="#000" size={40}></AntDesign>
            <UiText style={{padding: 20, fontSize: 12, ...styles.heading}}>Unlock App</UiText>
            <TouchableOpacity onPress={() => {
                let options = {
                  promptMessage: "App Lock settings",
                  cancelLabel: "Cancel"
                }
                LocalAuthentication.authenticateAsync(options).then((res) => {
                  console.log(res)
                  var success = res.success;
                  if(success === true){
                      setAuthenticate(false)
                  }else{
                    setAuthenticate(true);
                  }
                })
            }}>
              <MaterialIcons name="fingerprint" size={60} color="#000"></MaterialIcons>
              
            </TouchableOpacity>
            <Text>Tap the fingerprint icon</Text>
          </View>
        </Modal>


        
        <Modal
        visible={auth}
        transparent={true}
        animationType="fade"
        >
          <ScrollView style={{width: "100%", height: "100%", backgroundColor: "#fff", paddingVertical: 30}}>
          <View style={{width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 1)", flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
            
              <AntDesign name="user" color="#000" size={40}></AntDesign>
              <UiText style={{paddingLeft: 20, marginVertical: 10, fontSize: 12, ...styles.heading}}>Login to your account</UiText>
              <Input
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={(email) => {
                  setEmail(email);
                }}
                style={{height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colors.pinkLight, width: 300, paddingHorizontal: 20, marginVertical: 10}}
              >

              </Input>
              <Input
                placeholder='Password'
                keyboardType='default'
                secureTextEntry={true}
                onChangeText={(email) => {
                  setPassword(email);
                }}
                style={{height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colors.pinkLight, width: 300, paddingHorizontal: 20, marginVertical: 10}}
              >

              </Input>
              <TouchableOpacity onPress={() => {
                setLoginText("Please Wait");
                fetch(`https://getintellisoft.com/app/apis/login.php?email=${email}&password=${password}`, {
                  method: "GET"
                })
                .then(response => response.json())
                .then((data) => {
                  console.log(data)
                  if(data.code == 200){
                    AsyncStorage.setItem("isLoggedIn", `${email}`)
                    if(data.status === "Regular"){
                      Alert.alert("Message", "Your account is a Regular membership account. To subscribe kindly click the 'SUBSCRIBE FOR VIP' button at the top of the screen");
                      setAuth(false);
                    }else{
                      setAuth(false);
                      return refresh()
                    }
                    setLoginText("Login");
                  }else{
                    Alert.alert("Error", data.message);
                    setLoginText("Login");
                  }
                })
              }}  style={{backgroundColor: "#000", alignContent: "center", alignSelf: "center", width: 300, padding: 15, borderRadius: 5}}>
                <Text style={{fontWeight: "bold", color: "#fff", alignSelf: "center"}}>{loginText}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                WebBrowser.openBrowserAsync('https://user.getintellisoft.com/appresetpassword');
              }}  style={{backgroundColor: "#fff", borderColor: "#000", borderWidth: 1, alignContent: "center", alignSelf: "center", width: 300, padding: 15, marginTop: 10, borderRadius: 5}}>
                <Text style={{fontWeight: "bold", color: "#000", alignSelf: "center"}}>Forgot Password?</Text>
              </TouchableOpacity>

              <Text style={{fontSize: 30, color: "#c4c5c6", marginVertical: 40}}>OR</Text>
              <AntDesign name="adduser" color="#000" size={40}></AntDesign>
              <UiText style={{paddingLeft: 20, marginVertical: 10, fontSize: 12, ...styles.heading}}>Create an account</UiText>
              <Input
                placeholder='Fullname'
                keyboardType='default'
                onChangeText={(email) => {
                  setFullname(email);
                }}
                style={{height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colors.pinkLight, width: 300, paddingHorizontal: 20, marginVertical: 10}}
              >

              </Input>
              <Input
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={(email) => {
                  setEmail(email);
                }}
                style={{height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colors.pinkLight, width: 300, paddingHorizontal: 20, marginVertical: 10}}
              >

              </Input>
              <Input
                placeholder='Phone'
                keyboardType='phone-pad'
                onChangeText={(email) => {
                  setPhone(email);
                }}
                style={{height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colors.pinkLight, width: 300, paddingHorizontal: 20, marginVertical: 10}}
              >

              </Input>
              <Input
                placeholder='Password'
                keyboardType='default'
                secureTextEntry={true}
                onChangeText={(email) => {
                  setPassword(email);
                }}
                style={{height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colors.pinkLight, width: 300, paddingHorizontal: 20, marginVertical: 10}}
              >

              </Input>
              <TouchableOpacity onPress={() => {
                setRegisterText("Please Wait...");
                fetch(`https://getintellisoft.com/app/apis/register.php?email=${email}&password=${password}&phone=${phone}&fullname=${fullname}`, {
                  method: "GET"
                })
                .then(response => response.json())
                .then((data) => {
                  if(data.code == 200){
                    setAuth(false);
                    Alert.alert("Success", "Registration successfull, please proceed to membership activation");
                    AsyncStorage.setItem("isLoggedIn", `${email}`);
                    setRegisterText("Register");
                    return refresh();
                  }else{
                    Alert.alert("Error", data.message);
                    setRegisterText("Register");
                  }
                })
              }}  style={{backgroundColor: "#000", alignContent: "center", alignSelf: "center", width: 300, padding: 15, borderRadius: 5}}>
                <Text style={{fontWeight: "bold", color: "#fff", alignSelf: "center"}}>{RegisterText}</Text>
              </TouchableOpacity>
              <View style={{height: 60}}></View>
          </View>
          </ScrollView>  
        </Modal>
        <AdMobBanner
                  bannerSize="smartBanner"
                  style={{alignSelf: "center", position: "absolute", bottom: 0}}
                  adUnitID="ca-app-pub-6804638073300474/1046580056" // Test ID, Replace with your-admob-unit-id
                  // servePersonalizedAds // true or false
                  onDidFailToReceiveAdWithError={(e) => {
                    console.log(e)
                  }} 
                />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flex: 1,
    backgroundColor: "#000"
  },
  screen: {
    paddingTop: 50,
    backgroundColor: "#000",
    flex: 1
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

export default Live;
