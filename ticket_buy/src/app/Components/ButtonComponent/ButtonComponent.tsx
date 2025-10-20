import { Text, View } from "react-native";
import Style from "./ButtonCreatedStyle";

type BtnProps = {
  texto: string;
  qtnd: number;
  onPress?: () => void;
};



const BtnCreated = ({ texto,qtnd }: BtnProps) => {
  return (
    <View style={Style.backgroundBtn}>
      <View style={Style.backgroundSing}>
        {qtnd >= 0 && (
          <Text style={Style.backgroundTxtSing}>{qtnd}</Text>
        )}
      </View>
      <Text style={Style.backgroundTxt}>{texto}</Text>
    </View>
  );
};

export default BtnCreated;
