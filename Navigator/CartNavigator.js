import { createStackNavigator } from 'react-navigation-stack';
import Tips from '../screens/Cart';
import ProductDetail from '../screens/ProductDetail';

export const CartStackNavigator = createStackNavigator(
  {
    Tips: {
      screen: Tips,
    },
    CartProductDetail: {
      screen: ProductDetail,
    },
  },
  {
    headerMode: 'none',
  }
);