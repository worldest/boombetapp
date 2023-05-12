
import { View, Text, AsyncStorage, Alert, ImageBackground, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AntDesign} from "@expo/vector-icons"
import { useState } from 'react';
import COLORS from '../constants/COLORS';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {Input} from 'galio-framework'

function Landing(){
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [loginText, setLoginText] = useState("Login");
    const [RegisterText, setRegisterText] = useState("Register");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    
    return(
        <ImageBackground source={require("../assets/back.gif")} style={{flex: 1, width: "100%", justifyContent: "center"}}>
            <Animatable.Image animation="fadeInDown" source={require("../assets/icon.png")} style={{width: 200, height: 200, alignSelf: "center"}} />
            <Animatable.Text animation="fadeInUp" style={{fontSize: 30, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Hi, Chief</Animatable.Text>
            <Animatable.Text animation="fadeInUp" style={{fontSize: 15, marginVertical: 10, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Welcome to BoomBet</Animatable.Text>
            <Animatable.View animation="fadeInDown" style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 20, width: "95%", alignSelf: "center"}}>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#7f0e7970", alignContent: "center", alignItems: "center", height: 100, borderRadius: 10}}>
                    <AntDesign color="#f0f0f080" name="calendar" size={24} />
                    <Text animation="fadeInUp" style={{fontSize: 16, marginVertical: 10, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Daily Tips</Text>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#7f0e7970", alignContent: "center", alignItems: "center", height: 100, borderRadius: 10}}>
                    <AntDesign color="#f0f0f080" name="checkcircleo" size={24} />
                    <Text animation="fadeInUp" style={{fontSize: 16, marginVertical: 10, alignSelf: "center", fontWeight: "900", color: "#fff"}}>95% Accuracy</Text>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#7f0e7970", alignContent: "center", alignItems: "center", height: 100, borderRadius: 10}}>
                    <AntDesign color="#f0f0f080" name="like2" size={24} />
                    <Text animation="fadeInUp" style={{fontSize: 16, marginVertical: 10, alignSelf: "center", fontWeight: "900", color: "#fff"}}>12+ Sports</Text>
                </View>
                <View style={{width: "49%", justifyContent: "center", marginTop: 20}}>
                    <TouchableOpacity onPress={() => {
                        setLogin(true)
                    }} style={{borderWidth: 1, borderColor: "#fff", paddingVertical: 15, borderRadius: 10, width: "100%"}}>
                        <Text style={{color: "#fff", fontSize: 14, fontWeight: "900", alignSelf: "center"}}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: "49%", justifyContent: "center", marginTop: 20}}>
                    <TouchableOpacity onPress={() => {
                        setRegister(true)
                    }} style={{borderWidth: 1, backgroundColor: "#7f0e79", borderColor: "#7f0e79", paddingVertical: 15, borderRadius: 10, width: "100%"}}>
                        <Text style={{color: "#fff", fontSize: 14, fontWeight: "900", alignSelf: "center"}}>Join Us</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            <Modal
                visible={login}
                transparent={true}
                onRequestClose={() => {
                    setLogin(false)
                }}
                animationType="slide"
                >
                {/* <ScrollView style={{width: "100%", height: 500, position: "absolute", bottom: 0, backgroundColor: "#fff", paddingVertical: 30}}> */}
                    <View style={{width: "100%", height: 600, position: "absolute", borderTopRightRadius: 30, borderTopLeftRadius: 30, bottom: 0, backgroundColor: "#7f0e79", flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
                    
                    <AntDesign name="user" color="#ffffff60" size={40}></AntDesign>
                    <Animatable.Text style={{...styles.heading, paddingLeft: 0, fontSize: 25, color: "#fff", marginVertical: 10 }}>Login to your account</Animatable.Text>
                    <Input
                        placeholder='Email'
                        placeholderTextColor="#fff"
                        keyboardType='email-address'
                        onChangeText={(email) => {
                        setEmail(email);
                        }}
                        style={{height: 50, borderTopRightRadius: 30, borderWidth: 1, borderColor: "#ffffff60", color: "#fff", backgroundColor: "transparent", width: 350, height: 60, paddingHorizontal: 20, marginVertical: 10}}
                    />
                    <Input
                        placeholder='Password'
                        keyboardType='default'
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(email) => {
                        setPassword(email);
                        }}
                        style={{height: 50, borderTopRightRadius: 30, borderWidth: 1, borderColor: "#ffffff60", color: "#fff", backgroundColor: "transparent", width: 350, height: 60, paddingHorizontal: 20, marginVertical: 10}}
                     />
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
                            // Alert.alert("Message", "Your account is a Regular membership account. To subscribe kindly click the 'SUBSCRIBE FOR VIP' button at the top of the screen");
                            setLogin(false);
                            }else{
                            setLogin(false);
                            
                            }
                            setLoginText("Login");
                        }else{
                            Alert.alert("Error", data.message);
                            setLoginText("Try Again");
                        }
                        })
                    }}  
                    style={{backgroundColor: "transparent", borderWidth: 1, borderColor: "#ffffff60", alignContent: "center", alignSelf: "center", width: 350, borderTopRightRadius: 30, height: 60, justifyContent: "center", padding: 15, borderRadius: 5}}
                    
                    >
                        <Text style={{fontWeight: "bold", color: "#fff", alignSelf: "center"}}>{loginText}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => {
                        WebBrowser.openBrowserAsync('https://user.getintellisoft.com/appresetpassword');
                    }}  style={{backgroundColor: "#fff", borderColor: "#000", borderWidth: 1, alignContent: "center", alignSelf: "center", width: 300, padding: 15, marginTop: 10, borderRadius: 5}}>
                        <Text style={{fontWeight: "bold", color: "#000", alignSelf: "center"}}>Forgot Password?</Text>
                    </TouchableOpacity> */}
                    <View style={{height: 60}}></View>
                </View>
                {/* </ScrollView>   */}
            </Modal>
            <Modal
                visible={register}
                transparent={true}
                onRequestClose={() => {
                    setRegister(false)
                }}
                animationType="fade"
                >
                {/* <ScrollView style={{width: "100%", height: "100%", backgroundColor: "#fff", paddingVertical: 30}}> */}
                <View style={{width: "100%", height: 700, position: "absolute", borderTopRightRadius: 30, borderTopLeftRadius: 30, bottom: 0, backgroundColor: "#7f0e79", flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
                        <AntDesign name="adduser" color="#ffffff60" size={40}></AntDesign>
                        <Animatable.Text style={{...styles.heading, paddingLeft: 0, fontSize: 25, color: "#fff", marginVertical: 10 }}>Create an account</Animatable.Text>
                    <Input
                        placeholder='Fullname'
                        keyboardType='default'
                        placeholderTextColor="#fff"
                        onChangeText={(email) => {
                        setFullname(email);
                        }}
                        style={{height: 50, borderTopRightRadius: 30, borderWidth: 1, borderColor: "#ffffff60", color: "#fff", backgroundColor: "transparent", width: 350, height: 60, paddingHorizontal: 20, marginVertical: 10}}
                        >

                    </Input>
                    <Input
                        placeholder='Email'
                        keyboardType='email-address'
                        placeholderTextColor="#fff"
                        onChangeText={(email) => {
                        setEmail(email);
                        }}
                        style={{height: 50, borderTopRightRadius: 30, borderWidth: 1, borderColor: "#ffffff60", color: "#fff", backgroundColor: "transparent", width: 350, height: 60, paddingHorizontal: 20, marginVertical: 10}}
                   >

                    </Input>
                    <Input
                        placeholder='Phone'
                        keyboardType='phone-pad'
                        placeholderTextColor="#fff"
                        onChangeText={(email) => {
                        setPhone(email);
                        }}
                        style={{height: 50, borderTopRightRadius: 30, borderWidth: 1, borderColor: "#ffffff60", color: "#fff", backgroundColor: "transparent", width: 350, height: 60, paddingHorizontal: 20, marginVertical: 10}}
                   >

                    </Input>
                    <Input
                        placeholder='Password'
                        keyboardType='default'
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(email) => {
                        setPassword(email);
                        }}
                        style={{height: 50, borderTopRightRadius: 30, borderWidth: 1, borderColor: "#ffffff60", color: "#fff", backgroundColor: "transparent", width: 350, height: 60, paddingHorizontal: 20, marginVertical: 10}}
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
                            setRegister(false);
                            Alert.alert("Success", "Registration successfull, please proceed to membership activation");
                            AsyncStorage.setItem("isLoggedIn", `${email}`);
                            setRegisterText("Register");
                            
                        }else{
                            Alert.alert("Error", data.message);
                            setRegisterText("Try Again");
                        }
                        })
                    }}  
                    style={{backgroundColor: "transparent", borderWidth: 1, borderColor: "#ffffff60", alignContent: "center", alignSelf: "center", width: 350, borderTopRightRadius: 30, height: 60, justifyContent: "center", padding: 15, borderRadius: 5}}
                    
                    >
                        <Text style={{fontWeight: "bold", color: "#fff", alignSelf: "center"}}>{RegisterText}</Text>
                    </TouchableOpacity>
                    <View style={{height: 60}}></View>
                </View>
                {/* </ScrollView>   */}
            </Modal>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    view: {
      position: 'relative',
      flex: 1,
    },
    screen: {
      paddingTop: 50,
    },
    head: {
      paddingHorizontal: 15,
    },
    heading: {
      fontSize: 25,
      
      fontFamily: 'Nunito-Bold',
      color: COLORS.primaryColor,
    },
    subHeading: {
      fontSize: 16,
      color: COLORS.textColorLight,
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
export default Landing;