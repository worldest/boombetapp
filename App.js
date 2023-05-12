import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigation from './Navigator';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './screens/Landing';
import { AsyncStorage } from 'react-native';
// custom fonts
const fontsData = {
  Nunito: require('./assets/font/Inter-Regular.ttf'),
  'Nunito-light': require('./assets/font/Inter-Light.ttf'),
  'Nunito-SemiBold': require('./assets/font/Inter-Medium.ttf'),
  'Nunito-Bold': require('./assets/font/Inter-SemiBold.ttf'),
  Poppins: require('./assets/font/Poppins-Medium.ttf'),
  'Poppins-light': require('./assets/font/Poppins-Light.ttf'),
  'Poppins-SemiBold': require('./assets/font/Poppins-SemiBold.ttf'),
  'Poppins-Bold': require('./assets/font/Poppins-Bold.ttf'),
};

export default function App() {
  const [loaded] = useFonts(fontsData);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setInterval(() => {
      AsyncStorage.getItem("isLoggedIn").then((isLoggedIn) => {
        if(isLoggedIn === null || isLoggedIn === undefined){
          setIsLoggedIn(false)
        }else{
          setIsLoggedIn(true)
        }
      })
    }, 2000)
    
  }, [])
  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      {
        isLoggedIn === true ?
        <Navigation />
        :
        // <Landing />
        <Navigation />
      }
      
    </Provider>
  );
}
