import { StyleSheet } from "react-native";
const Colors =  {
  primary: '#e66000',
  secondary: '#b04a02',
  background: '#F2F2F7',
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#333333',
  lightGray: '#999999',
} as const;

const Style = StyleSheet.create({
    backgroundBtn:{
        backgroundColor: Colors.secondary,
        paddingHorizontal: 12,
        paddingVertical:8,
        marginRight:24,
        borderRadius: 4
    },
    backgroundTxt:{
        color:Colors.white
    },
    backgroundTxtSing:{
        color:Colors.white
    },
    backgroundSing:{
        width:24,
        height:24,
        borderRadius:12,
        position:'absolute',
        left:64,
        bottom:18,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#a8be00ff'
    }
});

export default Style;