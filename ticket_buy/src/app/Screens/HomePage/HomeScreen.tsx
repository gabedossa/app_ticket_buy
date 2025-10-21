import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardProduct from "../../Components/Card/CardProduct";
import HeaderNavBar from "../../Components/HeaderNavBar/HeaderNavBar";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Header fixo */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <HeaderNavBar />
        </View>
        
        {/* Conteúdo com padding para não sobrepor */}
        <ScrollView style={{ flex: 1, paddingTop: 80 }}> {/* Ajuste o paddingTop conforme necessário */}
          <View style={{ margin: 20, padding: 20, backgroundColor: "lightblue" }}>
            <CardProduct />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;