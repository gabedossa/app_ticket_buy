// HeaderNavBarStyle.js ATUALIZADO
import { StyleSheet } from "react-native";
import Colors from "../../../Constants/Colors";

const HeaderStyles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 80,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 32,
  },
  justifyNav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
    gap: 8,
  },
});

export default HeaderStyles;