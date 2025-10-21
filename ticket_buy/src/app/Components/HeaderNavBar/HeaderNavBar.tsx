import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import BtnCreated from "../ButtonComponent/ButtonComponent";
import HeaderStyles from "./HeaderNavBarStyle";

const HeaderNavBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[HeaderStyles.headerContainer, { paddingTop: insets.top }]}>
      <View style={HeaderStyles.justifyNav}>
        <View style={HeaderStyles.titleContainer}>
          <Icon name="fastfood" color={"#fff"} size={32} />
          <Text style={HeaderStyles.headerTitle}>Tiketeria</Text>
        </View>
        <View>
          <BtnCreated texto="Comprar" qtnd={0} />
        </View>
      </View>
    </View>
  );
};

export default HeaderNavBar;