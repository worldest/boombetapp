import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View } from 'react-native';
import { CATEGORIES } from '../../dummy_data/products';
import UiCategoryButton from '../UI/CategoryButton';
import { useState } from 'react';

const CategoriesBlock = ({ navigation }) => {
  const [popularProducts, setPopularProducts] = useState([]);
  fetch("https://getintellisoft.com/app/apis/categories.php", {
    method: "GET"
  })
  .then(response => response.json())
  .then((data) => {
    setPopularProducts(data)
  })
  .catch((error) => {
    
  })
  return (
    <View style={Styles.content}>
      <View
        style={{flexDirection: "row", paddingHorizontal: 20, flexWrap: "wrap", justifyContent: "space-between"}}
      >
        {popularProducts.map((data) => (
          <UiCategoryButton
            style={{ backgroundColor: data.color, marginVertical: 10, ...Styles.button }}
            key={data.id}
            data={data}
            textStyle={Styles.btnText}
            onPress={() =>
              AsyncStorage.setItem("cat", `${data.name}`).then(() => {
                navigation.navigate('Category', {
                  categoryName: data,
                })
              }).done()
              
            }
          />
        ))}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  content: {
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 17,
  },
});

export default CategoriesBlock;
