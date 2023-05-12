import React from 'react';
import { StyleSheet, View, ScrollView, Linking, AsyncStorage, TouchableOpacity, Alert, Share, Modal} from 'react-native';
import {WebView} from 'react-native-webview';
import * as LocalAuthentication from 'expo-local-authentication';
import UiText from '../components/UI/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Button, Text, Input, Block } from 'galio-framework';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      update: false,
      help: false,
      chat: false,
      user_info: {
        email: null,
        fullname: null,
        phone: null,
        status: null
      },
      userData: {
        fullname: "",
        email: "",
        expiry: "",
        phone: "",
        status: "",
        password: "",
        created_at: ""
      }
    }
  }
  componentDidMount(){
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
          this.setState({
            userData: data
          })
         
        })
        .catch((error) => {
  
        })
      }
    })
  }
  render(){
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000", paddingTop: 100 }}>
            <View style={{backgroundColor: "#000", width: "100%", height: 50, borderRadius: 30, flexDirection: "row"}}>
                <View style={{width: "15%", justifyContent: "center"}}>
                    <Text style={{alignSelf: "center", marginTop: 0, color: "#c4c5c6"}}><AntDesign name="user" size={40}></AntDesign></Text>
                </View>
                <View style={{width: "60%", justifyContent: "center"}}>
                    <Text style={{alignSelf: "flex-start", marginTop: 0, color: "#08919b", fontSize: 16, fontWeight: "400"}}>{this.state.userData.fullname}</Text>
                    <Text style={{alignSelf: "flex-start", marginTop: 0, color: "#fff", fontSize: 12, fontWeight: "400", marginBottom: 0}}>{this.state.userData.email}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                this.setState({
                    update: true
                })
            }} style={{width: "90%", alignSelf: "center", backgroundColor: "#000", paddingVertical: 25, paddingHorizontal: 15, marginVertical: 10}}>
                <Text style={{fontWeight: "normal",color: "#08919b", fontSize: 18, alignSelf: "flex-start"}}><AntDesign name="user" color="#fff" size={24}></AntDesign> View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                this.setState({
                    update: true
                })
            }} style={{width: "90%", alignSelf: "center", backgroundColor: "#000", paddingVertical: 25, paddingHorizontal: 15, marginVertical: 10}}>
                <Text style={{fontWeight: "normal",color: "#08919b", fontSize: 18, alignSelf: "flex-start"}}><AntDesign name="edit" color="#fff" size={24}></AntDesign> Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                this.setState({
                    help: true
                })
            }} style={{width: "90%", alignSelf: "center", backgroundColor: "#000", paddingVertical: 25, paddingHorizontal: 15, marginVertical: 10}}>
                <Text style={{fontWeight: "normal",color: "#08919b", fontSize: 18, alignSelf: "flex-start"}}><AntDesign name="customerservice" color="#fff" size={24}></AntDesign> Help & Support</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                {
                    Alert.alert("App Lock Settings", "Lock the app and require phone pin, fingerprint (Android & iOS), face unlock (Android), face ID (iOS) to access your app.", 
                    [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "Activate", onPress: () => {
                            let options = {
                                promptMessage: "App Lock settings",
                                cancelLabel: "Cancel"
                              }
                            LocalAuthentication.authenticateAsync(options).then((res) => {
                                console.log(res)
                                var success = res.success;
                                if(success === true){
                                    AsyncStorage.setItem("loginFaster", "true")
                                    Alert.alert("Success", "You have Locked your app from unauthorized access. Your fingerprint/Face ID/Face Unlock would now be required to open your app")
                                }else{
                                  Alert.alert("Error", "Something went wrong. Please retry")
                                }
                              })
                            
                        } },
                        { text: "Deactivate", onPress: () => {
                            let options = {
                                promptMessage: "Deactivate App Lock",
                                cancelLabel: "Cancel"
                              } 
                            LocalAuthentication.authenticateAsync(options).then((res) => {
                                console.log(res)
                                var success = res.success;
                                if(success === true){
                                    AsyncStorage.setItem("loginFaster", "false")
                                    Alert.alert("Success", "App Lock is deactivated successfully.")

                                }else{
                                  Alert.alert("Error", "Something went wrong. Please retry")
                                }
                              })
                        } }
                    ]
                    )
                }
            }} style={{width: "90%", alignSelf: "center", backgroundColor: "#000", paddingVertical: 25, paddingHorizontal: 15, marginVertical: 10}}>
                <Text style={{fontWeight: "normal",color: "#08919b", fontSize: 18, alignSelf: "flex-start"}}><MaterialIcons name="login" color="#fff" size={24}></MaterialIcons> App Lock Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                Share.share({message: `Hi, get latest football tips from boombet by installing the app via {link_here}`});
            }} style={{width: "90%", alignSelf: "center", backgroundColor: "#000", paddingVertical: 25, paddingHorizontal: 15, marginVertical: 10}}>
                <Text style={{fontWeight: "normal",color: "#08919b", fontSize: 18, alignSelf: "flex-start"}}><AntDesign name="plus" color="#fff" size={24}></AntDesign> Invite Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                Linking.openURL("https://wa.me/+2349065934827")
            }} style={{width: "90%", alignSelf: "center", backgroundColor: "#000", paddingVertical: 25, paddingHorizontal: 15, marginVertical: 10}}>
                <Text style={{fontWeight: "normal",color: "#08919b", fontSize: 18, alignSelf: "flex-start"}}><AntDesign name="phone" color="#fff" size={24}></AntDesign> Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                Alert.alert("Info", "Long press to logout");
            }} onLongPress={() => {
                
                AsyncStorage.removeItem("isLoggedIn")
                Alert.alert("Success", "You are logged out successfully")
            }} style={{width: "90%", alignSelf: "center", backgroundColor: "#000", paddingVertical: 25, paddingHorizontal: 15, marginVertical: 10}}>
                <Text style={{fontWeight: "normal",color: "#08919b", fontSize: 18, alignSelf: "flex-start"}}><AntDesign name="logout" color="#fff" size={24}></AntDesign> Log Out</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={this.state.help}
                onRequestClose={() => {
                    this.setState({
                        help: false
                    })
                }}
                animationType="slide"
            >
                <View style={{width: "100%", height: 200, bottom: 0, position: "absolute", borderTopRightRadius: 30, borderTopLeftRadius: 30, elevation: 100, marginTop: 0, paddingBottom: 50, paddingTop: 10, backgroundColor: "#f0f0f0"}}>
                    <View style={{width: "100%", borderRadius: 30, padding: 20, flexDirection: "row"}}>
                        <View style={{width: "60%", justifyContent: "center"}}>
                            <Text style={{fontWeight: "normal", color:"#08919b", fontSize: 18, alignSelf: "flex-start"}}>
                                Help Support
                            </Text>
                        </View>
                        <View style={{width: "40%", justifyContent: "center"}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    help: false
                                })
                            }}>
                                <AntDesign name="close" style={{alignSelf: "flex-end"}} size={24} color="#000"></AntDesign>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{width: "100%", borderRadius: 30, padding: 20, flexDirection: "row"}}>
                        <View style={{width: "33%", justifyContent: "center"}}>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL("https://t.me/Boomer001")
                            }}>
                                <MaterialIcons name="chat" style={{alignSelf: "center"}} size={40} color="#08919b"></MaterialIcons>
                            </TouchableOpacity>
                            <Text style={{fontWeight: "normal", color:"#08919b", fontSize: 18, alignSelf: "center"}}>
                                Telegram
                            </Text>
                        </View>
                        <View style={{width: "33%", justifyContent: "center"}}>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL("mailto:boombet@gmail.com")
                            }}>
                            <MaterialIcons name="mail" style={{alignSelf: "center"}} size={40} color="#08919b"></MaterialIcons>
                            </TouchableOpacity>
                            <Text style={{fontWeight: "normal", color:"#08919b", fontSize: 18, alignSelf: "center"}}>
                                Email
                            </Text>
                        </View>
                        <View style={{width: "33%", justifyContent: "center"}}>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL("https://wa.me/+2349065934827")
                            }}>
                                <MaterialIcons name="chat" style={{alignSelf: "center"}} size={40} color="#08919b"></MaterialIcons>
                            </TouchableOpacity>
                            <Text style={{fontWeight: "normal", color:"#08919b", fontSize: 18, alignSelf: "center"}}>
                                WhatsApp
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>


            <Modal
                transparent={true}
                visible={this.state.chat}
                onRequestClose={() => {
                    this.setState({
                        chat: false
                    })
                }}
                animationType="slide"
            >
                <View style={{width: "100%", height: "100%", elevation: 100, marginTop: 0, paddingBottom: 50, paddingTop: 10, backgroundColor: "#f0f0f0"}}>
                    <View style={{width: "100%", borderRadius: 30, padding: 20, flexDirection: "row"}}>
                        <View style={{width: "60%", justifyContent: "center"}}>
                            <Text style={{fontWeight: "normal", color:"#08919b", fontSize: 18, alignSelf: "flex-start"}}>
                                Chat Live
                            </Text>
                        </View>
                        <View style={{width: "40%", justifyContent: "center"}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    chat: false
                                })
                            }}>
                                <AntDesign name="close" style={{alignSelf: "flex-end"}} size={24} color="#000"></AntDesign>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width: "100%", marginTop: 10, height: "100%", backgroundColor: "transparent", flex:1}}>
                    <WebView
                        source={{
                        uri: 'https://www.tidio.com/talk/dam6ir0widl2lwpkklz4t6xbwxayblar'
                        }}
                        style={{ marginTop: 0 }}
                    />
                    </View>
                </View>
            </Modal>


            <Modal
                visible={this.state.update}
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    this.setState({
                        update: false
                    })
                }}
            >
                <View style={{width: "100%", height: "100%", marginTop: 0, paddingBottom: 50, paddingTop: 30, backgroundColor: "#000"}}>
                    <Text onPress={() => this.setState({update: false})} style={{fontSize: 18, padding: 10, fontWeight: "400", marginBottom: 40}}><AntDesign name="arrowleft" size={24} color="#fff"></AntDesign> Update Profile</Text>
                    <Text onPress={() => this.setState({update: false})} style={{fontSize: 18, paddingLeft: 20, fontWeight: "400", marginBottom: 5, color: "#fff"}}>Full Name</Text>
               <Input
                    placeholder="Full Name"
                    left
                    value={this.state.userData.fullname}
                    onChangeText={(regFullname) =>
                        {
                            this.setState({
                                newFullname: regFullname
                            })
                        }
                    
                    }
                    placeholderTextColor="#c4c5c6"
                    style={{width: "97%", borderWidth: 2, borderColor: "#c4c5c6", marginBottom: 10, height: 50, borderRadius: 30, alignSelf: "center"}}
                    icon="user"
                    family="antdesign"
                    iconSize={24}
                    iconColor="#c4c5c6"
                />
                <Text onPress={() => this.setState({update: false})} style={{fontSize: 18, paddingLeft: 20, fontWeight: "400", color: "#fff", marginBottom: 5}}>Email Address</Text>
                <Input
                    placeholder="Email"
                    left
                    value={this.state.userData.email}
                    onChangeText={(regEmail) =>
                        {
                            this.setState({
                                newEmail: regEmail
                            })
                        }
                    }
                    style={{width: 350, borderWidth: 2, width: "97%", borderRadius: 30, borderColor: "#c4c5c6", marginBottom: 0, height: 50, borderRadius: 30, alignSelf: "center"}}
                    icon="mail"
                    placeholderTextColor="#c4c5c6"
                    family="antdesign"
                    iconSize={24}
                    iconColor="#c4c5c6"
                />
                <Text onPress={() => this.setState({update: false})} style={{fontSize: 18, paddingLeft: 20, fontWeight: "400", color: "#fff", marginBottom: 5}}>Phone Number</Text>
                
                    <Input
                        placeholder="987654321"
                        left
                        value={this.state.userData.phone}
                        onChangeText={(regPhone) =>
                        {
                            this.setState({
                                newPhone: regPhone
                            })
                        }
                        }
                        style={{width: "97%", borderWidth: 2, borderColor: "#c4c5c6", height: 50,  borderRadius: 30, alignSelf: "center"}}
                        icon="phone"
                        placeholderTextColor="#c4c5c6"
                        family="antdesign"
                        iconSize={24}
                        iconColor="#c4c5c6"
                    />
                
                    <Button style={{backgroundColor: "#08919b", width: "97%", borderRadius: 30, marginTop: 30, alignSelf: "center"}} color="info" onPress={()=>
                    {
                        fetch(`https://getintellisoft.com/app/apis/update?name=${this.state.userData.fullname}&phonenumber=${this.state.userData.phone}`, 
                        {
                            method: 'GET', 
                            
                        })
                        .then(response => response.json())
                        .then((data) => {

                        })
                    }
                    }
                    >
                        Update
                    </Button>
                    
                </View>
            </Modal>
            
        </ScrollView>
  );
                  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
