import { StyleSheet } from "react-native";
import Colors from "../../../Constants/Colors";

const HeaderStyles = StyleSheet.create({
  NavBackground: {
    width: "100%",
    backgroundColor: Colors.primary,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop:32,
    height: 80,
  },
  justifyNav:{
    width:'100%',
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft:24,
    gap: 8,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HeaderStyles;
