import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import COLORS from '../constants/COLORS';
import { createAppContainer } from 'react-navigation';
import { ProductStackNavigator } from './ProductNavigator';
import Profile from '../screens/Profile';
import { CartStackNavigator } from './CartNavigator';
import Live from '../screens/Live';
import Bookies from '../screens/Bookies';
import Convert from '../screens/Convert';

const tabScreensConfig = {
  Home: {
    screen: ProductStackNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <AntDesign name="home" size={25} color={tabInfo.tintColor} />
      ),
    },
  },
  Bookies: {
    screen: Bookies,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Entypo name="ticket" size={25} color={tabInfo.tintColor} />
      ),
    },
  },
  News: {
    screen: Convert,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Entypo name="list" size={25} color={tabInfo.tintColor} />
      ),
    },
  },
  Live_Matches: {
    screen: Live,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Entypo name="video-camera" size={25} color={tabInfo.tintColor} />
      ),
    },
  }
};

const AppTabNavigation = createMaterialBottomTabNavigator(tabScreensConfig, {
  activeColor: "#fff",
  inactiveColor: "#c4c5c680",
  initialRouteName: "Home",
  shifting: true,
  barStyle: {
    backgroundColor: '#000',
    elevation: 20
  },
});

export default createAppContainer(AppTabNavigation);
