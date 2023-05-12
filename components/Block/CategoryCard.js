import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, Alert, ImageBackground, TouchableOpacity, Modal, ScrollView } from 'react-native';
import COLORS from '../../constants/COLORS';
import { getTag } from '../../utilities/tag';
import UiIconButton from '../UI/IconButton';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'react-native-google-mobile-ads';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import UiText from '../UI/Text';
import TimeAgo from 'react-native-timeago';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/actions/cartActions';
import * as Animatable from 'react-native-animatable';
import { Clipboard } from 'react-native';
const ProductCardBlock = ({ data, type }) => {
  const [view, setView] = React.useState(false);
  const [matchData, setMatchData] = React.useState(
    {
      "category": "",
      "club_one": "",
      "club_two": "",
      "comment": "2X",
      "created_at": "2022-07-01 03:37:26.949725",
      "description": "",
      "id": "",
      "image": "",
      "odd": "",
      "price": "League of Ireland Premier Division (Free Tips)",
      "score_one": "",
      "score_two": "",
      "status_icon": "autorenew",
      "status_text": "This game is pending",
      "title": "League of Ireland Premier Division (Free Tips)",
      "updated_at": "2022-07-01 03:37:26.949725",
    }
  )
  const [active, setActive] = useState(false)
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  var color_;
  if(data.status_icon === "autorenew"){
    color_ = "orange";
  }else if(data.status_icon === "check"){
    color_ = "green";
  }else{
    color_ = "red";
  } 
  const showInterstitial = () => {
    AdMobInterstitial.setAdUnitID("ca-app-pub-6804638073300474/8721620590");
    AdMobInterstitial.requestAdAsync().then(() => {
      AdMobInterstitial.showAdAsync().catch((e) => console.log(e));
    });
  }
  return (
    <Animatable.View duration={1000} animation="fadeInUp" style={Styles.container}>
      <TouchableOpacity onPress={() => {
        
        setMatchData(data);
        setView(true);
        console.log(data)
        showInterstitial();
      }}>
      <View style={Styles.infoSec}>
      <View style={{flexDirection: "row", backgroundColor: "#eee", padding: 0, borderRadius: 10}}>
          <View style={{width: "30%", justifyContent: "center"}}>
            <View style={{width: 60, height: 60, alignSelf: "center", backgroundColor: "#fff", borderRadius: 400, justifyContent: "center", alignItems: "center"}}>
              <Image source={{uri: data.club_one_logo || "https://static.vecteezy.com/system/resources/previews/015/276/951/original/soccer-ball-illustration-icon-sport-element-free-png.png"}}
                style={{width: 40, height: 40, borderRadius: 100}}
              />
            </View>
            <Text style={{fontFamily: "Poppins", color: "#000", alignSelf: "center", fontSize: 11, marginVertical: 10}}>{data.club_one}</Text>
          </View>
          <View style={{width: "40%", justifyContent: "center"}}>
            <Text style={{fontSize: 45, fontFamily: "Poppins-Bold", alignSelf: "center"}}>{data.score_one || 0} : {data.score_two || 0}</Text>
            <View style={{backgroundColor: "#fff", width: 100, borderRadius: 30, height: 40, justifyContent: "center", alignSelf: "center"}}>
              <Text style={{fontFamily: "Poppins", color: "#000", fontSize: 10, alignSelf: "center", marginVertical: 10}}><FontAwesome name="clock-o" size={15} /> <TimeAgo time={data.match_time} interval={20000} /></Text>
            </View>
          </View>
          <View style={{width: "30%", justifyContent: "center"}}>
            <View style={{width: 60, alignSelf: "center", height: 60, backgroundColor: "#fff", borderRadius: 400, justifyContent: "center", alignItems: "center"}}>
              <Image source={{uri: data.club_two_logo || "https://static.vecteezy.com/system/resources/previews/015/276/951/original/soccer-ball-illustration-icon-sport-element-free-png.png"}}
                style={{width: 40, height: 40, borderRadius: 100}}
              />
            </View>
            <Text style={{fontFamily: "Poppins", color: "#000",fontSize: 11, alignSelf: "center", marginVertical: 10}}>{data.club_two}</Text>
          </View>
        </View>

      </View>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        onRequestClose={() => {
          setView(false)
        }}
        visible={view}
      >
      <ScrollView style={{width: "100%", alignSelf: "center", borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingVertical: 0, elevation: 10, height: "100%", position: "absolute", bottom: 0, backgroundColor: "#fff"}}>
          <View style={{width: "100%", height: 100, flexDirection: "row", backgroundColor: "#000", justifyContent: "center", paddingHorizontal: 20}}>
            <View style={{width: "30%", justifyContent: "center"}}>
              <TouchableOpacity style={{borderWidth: 1, padding: 5, borderRadius: 100, alignItems: "center", justifyContent: "center", height: 40, width: 40, borderColor: "#fff"}} onPress={() => {
                setView(false)
              }}>
              <MaterialIcons name="arrow-back" color="#fff" size={24} />
              </TouchableOpacity>
            </View>
            <View style={{width: "70%", justifyContent: "center"}}>
              <Text style={{fontSize: 30, color: "#fff", fontFamily: "Poppins-Bold" }}>Information</Text>
            </View>
          </View>
          {/* <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 15, alignSelf: "center"}}>{matchData.title}</Text>
          <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 12, alignSelf: "center"}}>{matchData.price}</Text> */}
          <View style={{width: "100%", marginBottom: 15, backgroundColor: "#fff", paddingVertical: 30, paddingHorizontal: 20}}>
            {/* <View style={{width: "40%", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "#fff"}}>Home</Text>
              <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 20, padding: 10, borderRadius: 10, backgroundColor: "#A1EA3599"}}>{matchData.club_one}</Text>
            </View>
            <View style={{width: "20%", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 20}}>VS</Text>
            </View>
            <View style={{width: "40%", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "#fff"}}>Home</Text>
              <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 20, padding: 10, borderRadius: 10, backgroundColor: "#A1EA3599"}}>{matchData.club_two}</Text>
            </View> */}

            <View style={{flexDirection: "row", height: 140, backgroundColor: "#eee", padding: 10, borderRadius: 10}}>
              <View style={{width: "30%", justifyContent: "center"}}>
                <View style={{width: 60, alignSelf: "center", height: 60, backgroundColor: "#fff", borderRadius: 400, justifyContent: "center", alignItems: "center"}}>
                  <Image source={{uri: data.club_one_logo || "https://static.vecteezy.com/system/resources/previews/015/276/951/original/soccer-ball-illustration-icon-sport-element-free-png.png"}}
                    style={{width: 40, height: 40, borderRadius: 100}}
                  />
                </View>
                <Text style={{fontFamily: "Poppins",fontSize: 11, color: "#000", alignSelf: "center", marginVertical: 10}}>{data.club_one}</Text>
              </View>
              <View style={{width: "40%", justifyContent: "center"}}>
                <Text style={{fontSize: 45, fontFamily: "Poppins-Bold", alignSelf: "center"}}>{data.score_one || 0} : {data.score_two || 0}</Text>
                <View style={{backgroundColor: "#fff", width: 120, borderRadius: 30, height: 40, justifyContent: "center", alignSelf: "center"}}>
                  <Text style={{fontFamily: "Poppins", color: "#000", fontSize: 11, alignSelf: "center", marginVertical: 10}}><FontAwesome name="clock-o" size={15} /> <TimeAgo time={data.match_time} interval={20000} /></Text>
                </View>
              </View>
              <View style={{width: "30%", justifyContent: "center"}}>
                <View style={{width: 60, alignSelf: "center", height: 60, backgroundColor: "#fff", borderRadius: 400, justifyContent: "center", alignItems: "center"}}>
                  <Image source={{uri: data.club_two_logo || "https://static.vecteezy.com/system/resources/previews/015/276/951/original/soccer-ball-illustration-icon-sport-element-free-png.png"}}
                    style={{width: 40, height: 40, borderRadius: 100}}
                  />
                </View>
                <Text style={{fontFamily: "Poppins",fontSize: 11, color: "#000", alignSelf: "center", marginVertical: 10}}>{data.club_two}</Text>
              </View>
            </View>

            

          </View>
          
          {/* <Animatable.View animation="fadeInDown" style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 20, width: "95%", alignSelf: "center"}}>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80",  alignContent: "center", paddingVertical: 10, alignItems: "center",borderRadius: 10}}>
                    <TouchableOpacity onPress={() => {
                      Alert.alert("Message",  matchData.status_text);
                    }}>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Match Result</Text>
                    <MaterialIcons name={matchData.status_icon} size={24} color="#fff" style={{padding: 15, marginVertical: 10, borderRadius: 100, backgroundColor: matchData.status_icon === "check" ? "#A1EA3599" : matchData.status_icon === "autorenew" ? "orange" : "red"}} />
                    </TouchableOpacity>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80",  alignContent: "center", paddingVertical: 10, alignItems: "center",borderRadius: 10}}>
                    <TouchableOpacity onPress={() => {
                      Alert.alert("Message",  `Stake on ${matchData.comment}`);
                    }}>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Tip</Text>
                    <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 14, padding: 10, borderRadius: 10, backgroundColor: "#A1EA3599"}}>{matchData.comment}</Text>
            
                    </TouchableOpacity>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80",  alignContent: "center", paddingVertical: 10, alignItems: "center",borderRadius: 10}}>
                    <TouchableOpacity onPress={() => {
                      Alert.alert("Message",  `Stake on ${matchData.comment}`);
                    }}>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Correct Score</Text>
                    <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 14, padding: 10, borderRadius: 10, backgroundColor: "#A1EA3599", alignSelf: "center"}}>{data.possible_correct_score}</Text>
            
                    </TouchableOpacity>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80", marginVertical: 5,  alignContent: "center", paddingVertical: 10, alignItems: "center",borderRadius: 10}}>
                    <TouchableOpacity onPress={() => {
                      Alert.alert("Message",  `Stake on ${matchData.comment}`);
                    }}>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Bookie</Text>
                    <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 14, padding: 10, borderRadius: 10, backgroundColor: "#A1EA3599", alignSelf: "center"}}>{data.bookie}</Text>
            
                    </TouchableOpacity>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80", marginVertical: 5,  alignContent: "center", paddingVertical: 10, alignItems: "center",borderRadius: 10}}>
                    <TouchableOpacity onPress={() => {
                      Clipboard.setString(data.bookie_code);
                      Alert.alert("Success", "Code copied to clipboard")
                    }}>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Slip Code</Text>
                    <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 14, padding: 10, borderRadius: 10, backgroundColor: "#A1EA3599", alignSelf: "center"}}>{data.bookie_code}</Text>
            
                    </TouchableOpacity>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80", marginVertical: 5,  alignContent: "center", paddingVertical: 10, alignItems: "center",borderRadius: 10}}>
                    <TouchableOpacity onPress={() => {
                      Clipboard.setString(data.bookie_code);
                      Alert.alert("Success", "Code copied to clipboard")
                    }}>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Odds</Text>
                    <Text style={{color: "#fff", fontWeight: "900", marginVertical: 5, fontSize: 14, padding: 10, borderRadius: 10, backgroundColor: "#A1EA3599", alignSelf: "center"}}>{data.odd}</Text>
            
                    </TouchableOpacity>
                </View>
                <View style={{width: "100%", justifyContent: "center", marginTop: 20}}>
                      <Text style={{color: "#fff", fontSize: 10, fontWeight: "900", alignSelf: "flex-start"}}>Match Time</Text>
                </View>
                <View style={{width: "49%", justifyContent: "center", marginTop: 2}}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("News")
                    }} style={{borderWidth: 1, borderColor: "#fff", paddingVertical: 15, borderRadius: 10, width: "100%"}}>
                        <Text style={{color: "#fff", fontSize: 10, fontWeight: "900", alignSelf: "center"}}>{data.match_time}</Text>
                    </TouchableOpacity>
                </View>
                {
                  data.bookie === "1XBet" ? 
                  <View style={{width: "49%", justifyContent: "center", marginTop: 2}}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://bit.ly/3fkyrlm");
                    }} style={{borderWidth: 1, backgroundColor: "#0064ba", borderColor: "#7f0e79", paddingVertical: 15, borderRadius: 10, width: "100%"}}>
                        <Text style={{color: "#fff", fontSize: 14, fontWeight: "900", alignSelf: "center"}}>Go to 1XBet</Text>
                    </TouchableOpacity>
                </View>
                :
                data.bookie === "22Bet" ? 
                <View style={{width: "49%", justifyContent: "center", marginTop: 2}}>
                    <TouchableOpacity onPress={() => {
                       Linking.openURL("https://cutt.ly/BOOMBET");
                    }} style={{borderWidth: 1, backgroundColor: "#0064ba", borderColor: "#7f0e79", paddingVertical: 15, borderRadius: 10, width: "100%"}}>
                        <Text style={{color: "#fff", fontSize: 14, fontWeight: "900", alignSelf: "center"}}>Go to 22Bet</Text>
                    </TouchableOpacity>
                </View>
                :
                data.bookie === "Paripesa" ?
                <View style={{width: "49%", justifyContent: "center", marginTop: 2}}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://paripesa.bet/boombet201");
                    }} style={{borderWidth: 1, backgroundColor: "#0064ba", borderColor: "#7f0e79", paddingVertical: 15, borderRadius: 10, width: "100%"}}>
                        <Text style={{color: "#fff", fontSize: 14, fontWeight: "900", alignSelf: "center"}}>Go to Paripesa</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{width: "49%", justifyContent: "center", marginTop: 2}}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://t.me/BOOMBET201")
                    }} style={{borderWidth: 1, backgroundColor: "#0064ba", borderColor: "#7f0e79", paddingVertical: 15, borderRadius: 10, width: "100%"}}>
                        <Text style={{color: "#fff", fontSize: 14, fontWeight: "900", alignSelf: "center"}}>Join Telegram</Text>
                    </TouchableOpacity>
                </View>
                }
                
          </Animatable.View>
            <UiText style={{...styles.heading, marginLeft: 20}}>Get deposit bonus</UiText>
          <Animatable.View animation="fadeInDown" style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 20, width: "95%", alignSelf: "center"}}>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80",  alignContent: "center", paddingVertical: 10, alignItems: "center",borderRadius: 10}}>
                    <TouchableOpacity onPress={() => {
                      Linking.openURL("https://bit.ly/3fkyrlm");
                    }}>
                    <Image source={require("../../assets/1xbet.png")} style={{width: 40, height: 40, alignSelf: "center"}} />
                    <Text animation="fadeInUp" style={{fontSize: 16, marginVertical: 5, alignSelf: "center", fontWeight: "900", color: "#fff"}}>BOOMBET201</Text>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Register 1xBet</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80", paddingVertical: 10, alignContent: "center", alignItems: "center", borderRadius: 10}}>
                  <TouchableOpacity onPress={() => {
                      Linking.openURL("https://cutt.ly/BOOMBET");
                    }}>
                    <Image source={require("../../assets/22bet.png")} style={{width: 40, height: 40, alignSelf: "center"}} />
                    <Text animation="fadeInUp" style={{fontSize: 16, marginVertical: 5, alignSelf: "center", fontWeight: "900", color: "#fff"}}>N/A</Text>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Register 22Bet</Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: "33%", justifyContent: "center", backgroundColor: "#ffffff80", paddingVertical: 10, alignContent: "center", alignItems: "center", borderRadius: 10}}>
                  <TouchableOpacity onPress={() => {
                      Linking.openURL("https://paripesa.bet/boombet201");
                    }}>
                    <Image source={require("../../assets/pari.png")} style={{width: 40, height: 40, alignSelf: "center"}} />
                    <Text animation="fadeInUp" style={{fontSize: 16, marginVertical: 5, alignSelf: "center", fontWeight: "900", color: "#fff"}}>BOOMBET201</Text>
                    <Text animation="fadeInUp" style={{fontSize: 12, marginVertical: 0, alignSelf: "center", fontWeight: "900", color: "#fff"}}>Register Paripesa</Text>
                  </TouchableOpacity>
                </View>
                
            </Animatable.View> */}
            {/* <View style={{height: 100}} /> */}
            <View style={{flexDirection: "row", paddingHorizontal: 20}}>
              <TouchableOpacity
                onPress={() => {
                  setActive(active => !active);
                }}
                style={{
                  borderBottomWidth: 3,
                  borderColor: active === false ? "#c2f44e" : "#ffffff00"
                }}
              >
                <Text style={{fontSize: 24, color: active  === false ? "#000" : "#c4c5c6", fontFamily: "Poppins-Bold"}}>Predictions</Text>
              </TouchableOpacity>
              {
                type === "live" ?
                <TouchableOpacity
                onPress={() => {
                  setActive(active => !active);
                }}
                  style={{
                    marginLeft: 30,
                    borderBottomWidth: 3,
                    borderColor: active === true ? "#c2f44e" : "#ffffff00"
                  }}
                >
                  <Text style={{fontSize: 24, color: active === false ? "#c4c5c6" : "#000", fontFamily: "Poppins-Bold"}}>Statistics</Text>
                </TouchableOpacity>
                :

                <></>
              }
              
            </View>
            {
              active === true ?
              <View style={{marginTop: 20}}>
                <View style={{flexDirection: "row", flexWrap: "wrap", width: "90%", alignSelf: "center"}}>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "80%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins", fontSize: 15, alignSelf: "center"}}>Ball Possession (%)</Text>
                  </View>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "100%", height: 20, backgroundColor: "#eee", flexDirection: "row", borderRadius: 10, marginTop: 10, justifyContent: "center"}}>
                    <View style={{width: "30%", height: 20, backgroundColor: "#70ddcf", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}} />
                    <View style={{width: "30%", height: 20, backgroundColor: "#09154d", borderTopRightRadius: 10, borderBottomRightRadius: 10}} />
                  </View>
                </View>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 20, width: "90%", alignSelf: "center"}}>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "80%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins", fontSize: 15, alignSelf: "center"}}>Goal Attempts</Text>
                  </View>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "100%", height: 20, backgroundColor: "#eee", flexDirection: "row", borderRadius: 10, marginTop: 10, justifyContent: "center"}}>
                    <View style={{width: "30%", height: 20, backgroundColor: "#70ddcf", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}} />
                    <View style={{width: "30%", height: 20, backgroundColor: "#09154d", borderTopRightRadius: 10, borderBottomRightRadius: 10}} />
                  </View>
                </View>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 20, width: "90%", alignSelf: "center"}}>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "80%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins", fontSize: 15, alignSelf: "center"}}>Shots on Goal</Text>
                  </View>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "100%", height: 20, backgroundColor: "#eee", flexDirection: "row", borderRadius: 10, marginTop: 10, justifyContent: "center"}}>
                    <View style={{width: "30%", height: 20, backgroundColor: "#70ddcf", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}} />
                    <View style={{width: "30%", height: 20, backgroundColor: "#09154d", borderTopRightRadius: 10, borderBottomRightRadius: 10}} />
                  </View>
                </View>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 20, width: "90%", alignSelf: "center"}}>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "80%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins", fontSize: 15, alignSelf: "center"}}>Shots off Goal</Text>
                  </View>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "100%", height: 20, backgroundColor: "#eee", flexDirection: "row", borderRadius: 10, marginTop: 10, justifyContent: "center"}}>
                    <View style={{width: "30%", height: 20, backgroundColor: "#70ddcf", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}} />
                    <View style={{width: "30%", height: 20, backgroundColor: "#09154d", borderTopRightRadius: 10, borderBottomRightRadius: 10}} />
                  </View>
                </View>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 20, width: "90%", alignSelf: "center"}}>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "80%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins", fontSize: 15, alignSelf: "center"}}>Passes</Text>
                  </View>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "100%", height: 20, backgroundColor: "#eee", flexDirection: "row", borderRadius: 10, marginTop: 10, justifyContent: "center"}}>
                    <View style={{width: "30%", height: 20, backgroundColor: "#70ddcf", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}} />
                    <View style={{width: "30%", height: 20, backgroundColor: "#09154d", borderTopRightRadius: 10, borderBottomRightRadius: 10}} />
                  </View>
                </View>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 20, width: "90%", alignSelf: "center"}}>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "80%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins", fontSize: 15, alignSelf: "center"}}>Free Kicks</Text>
                  </View>
                  <View style={{width: "10%", justifyContent: "center"}}>
                    <Text style={{fontFamily: "Poppins-Bold"}}>--</Text>
                  </View>
                  <View style={{width: "100%", height: 20, backgroundColor: "#eee", flexDirection: "row", borderRadius: 10, marginTop: 10, justifyContent: "center"}}>
                    <View style={{width: "30%", height: 20, backgroundColor: "#70ddcf", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}} />
                    <View style={{width: "30%", height: 20, backgroundColor: "#09154d", borderTopRightRadius: 10, borderBottomRightRadius: 10}} />
                  </View>
                </View>
              </View>
              :
              <View  style={{width: "100%", marginTop: 20}}>
                <View style={{width: 150, alignSelf: "center", backgroundColor: "#09154d", borderRadius: 30, justifyContent: "center", height: 45, alignItems: "center"}}>
                  <Text style={{color: "#fff", fontFamily: "Poppins", fontSize: 17}}>Predictions</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignSelf: "center", marginTop: 20}}>
                  <View style={{paddingHorizontal: 15, alignSelf: "center", margin: 3, backgroundColor: "#70ddcf", borderRadius: 30, justifyContent: "center", height: 45, alignItems: "center"}}>
                    <Text style={{color: "#fff", fontFamily: "Poppins-Bold", fontSize: 17}}>Tips: <Text style={{color: "#09154d"}}>{data.comment}</Text></Text>
                  </View>
                  <View style={{paddingHorizontal: 15, alignSelf: "center", backgroundColor: "#70ddcf", margin: 3, borderRadius: 30, justifyContent: "center", height: 45, alignItems: "center"}}>
                    <Text style={{color: "#fff", fontFamily: "Poppins-Bold", fontSize: 17}}>Odds: {" "} <Text style={{color: "#09154d"}}>{data.odd}</Text></Text>
                  </View>
                </View>
                <View style={{paddingHorizontal: 35, alignSelf: "center", marginTop: 30, backgroundColor: "#09154d", borderRadius: 30, justifyContent: "center", height: 45, alignItems: "center"}}>
                  <Text style={{color: "#fff", fontFamily: "Poppins", fontSize: 17}}>Possible Correct Score</Text>
                </View>
                <View style={{flexDirection: "row", height: 140, marginTop: 30, width: "90%", alignSelf: "center", backgroundColor: "#eee", padding: 10, borderRadius: 10}}>
                  <View style={{width: "30%", justifyContent: "center"}}>
                    <View style={{width: 60, alignSelf: "center", height: 60, backgroundColor: "#fff", borderRadius: 400, justifyContent: "center", alignItems: "center"}}>
                      <Image source={{uri: data.club_one_logo || "https://static.vecteezy.com/system/resources/previews/015/276/951/original/soccer-ball-illustration-icon-sport-element-free-png.png"}}
                        style={{width: 40, height: 40, borderRadius: 100}}
                      />
                    </View>
                    <Text style={{fontFamily: "Poppins",fontSize: 11, color: "#000", alignSelf: "center", marginVertical: 10}}>{data.club_one}</Text>
                  </View>
                  <View style={{width: "40%", justifyContent: "center"}}>
                    <Text style={{fontSize: 45, fontFamily: "Poppins-Bold", alignSelf: "center"}}>{data.possible_correct_score}</Text>
                  </View>
                  <View style={{width: "30%", justifyContent: "center"}}>
                    <View style={{width: 60, alignSelf: "center", height: 60, backgroundColor: "#fff", borderRadius: 400, justifyContent: "center", alignItems: "center"}}>
                      <Image source={{uri: data.club_two_logo || "https://static.vecteezy.com/system/resources/previews/015/276/951/original/soccer-ball-illustration-icon-sport-element-free-png.png"}}
                        style={{width: 40, height: 40, borderRadius: 100}}
                      />
                    </View>
                    <Text style={{fontFamily: "Poppins", color: "#000",fontSize: 11, alignSelf: "center", marginVertical: 10}}>{data.club_two}</Text>
                  </View>
                </View>
                <View style={{paddingHorizontal: 35, alignSelf: "center", marginTop: 30, backgroundColor: "#09154d", borderRadius: 30, justifyContent: "center", height: 45, alignItems: "center"}}>
                  <Text style={{color: "#fff", fontFamily: "Poppins", fontSize: 17}}>Match Status</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignSelf: "center", marginTop: 20}}>
                  
                  <View style={{paddingHorizontal: 15, alignSelf: "center", backgroundColor: "#70ddcf", margin: 3, borderRadius: 30, justifyContent: "center", height: 45, alignItems: "center"}}>
                    <Text style={{color: "#fff", fontFamily: "Poppins-Bold", fontSize: 17}}><Text style={{color: "#09154d"}}>{data.status_text}</Text></Text>
                  </View>
                </View>
              </View>
            }
            
        </ScrollView>
      </Modal>
    </Animatable.View>
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
const Styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "90%",
    backgroundColor: "#eee",
    alignSelf: "center",
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 5
  },
  imageSec: {
    width: '100%',
    maxHeight: 170,
    height: '100%',
    borderRadius: 20,
    backgroundColor: "red",
  },

  productImage: {
    height: '100%',
    width: '100%',
  },

  infoSec: {
    paddingHorizontal: 5,
    position: 'relative',
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
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
    color: COLORS.black,
  },

  addToBag: {
    height: 40,
    marginVertical: 10,
    width: 40,
    borderRadius: 20,
    elevation: 5,
  },
});

export default ProductCardBlock;
