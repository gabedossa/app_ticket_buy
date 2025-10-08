/* eslint-disable import/no-unresolved */
// Localização: components/itemCard/CardItem.tsx

import { Button } from "@react-navigation/elements";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

type CardItemProps = {
  name: string;
  price: number;
};

export function CardItem({ name, price }: CardItemProps) {
  const formattedPrice = (typeof price === "number" ? price : 0).toFixed(2);

  return (
    <View style={styles.card}>
        <View style={styles.imagem}></View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>R$ {formattedPrice}</Text>
      <View style={styles.btnArea}>
        <Button style={styles.buyButton}>
            <Icon name="shopping-cart" size={30} color="#FFF"/> 
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagem:{
    width:'100%',
    height:240,
    backgroundColor:'#aaa',
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btnArea:{
    width:"100%",
    height: 32,
    alignItems:'flex-end',
  },
  price: {
    fontSize: 14,
    color: "#27ae60",
    marginTop: 4,
  },
  buyButton:{
    backgroundColor:"#993300",
    margin: 5,
    padding:5, 
  }
});
