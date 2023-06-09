import { createStackNavigator } from 'react-navigation-stack';
import Category from '../screens/Category';
import ProductDetail from '../screens/ProductDetail';
import Products from '../screens/Products';
import Landing from '../screens/Landing';
import News from '../screens/News';
export const ProductStackNavigator = createStackNavigator(
  {
    Products: {
      screen: Products,
    },
    ProductDetail: {
      screen: ProductDetail,
    },
    Category: {
      screen: Category,
    },
    Landing: {
      screen: Landing
    },
    News: {
      screen: News
    }
  },
  {
    headerMode: 'none',
  }
);
