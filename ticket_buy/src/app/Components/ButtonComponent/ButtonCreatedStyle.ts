import Colors from "@/src/Constants/Colors";
import { StyleSheet } from "react-native";

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