//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {FONTS,COLORS} from '../constants'
// create a component
const Tabicon = ({
    icon,
    iconStyle,
    focused,
    label,
    isTrade,
}) => {
    if(isTrade){
        return(
            <View style={styles.tradeContainer}>
                <Image
                source={icon}
                resizeMode = 'contain'
                style= {{
                    ...styles.iconStyle,
                    ...iconStyle,
                    tintColor: COLORS.white
                }}
                />
                <Text style={{
                    color: COLORS.white,
                    ...FONTS.h4
                }}>{label}</Text>
            </View>
        )
    }
    else{
        return(
            <View style={styles.container}>
            <Image
            source={icon}
            resizeMode = 'contain'
            style={{...styles.iconStyle,...iconStyle,tintColor: focused? COLORS.white: COLORS.secondary}}
            />
            <Text
            style={{
                color: focused? COLORS.white: COLORS.secondary,
                ...FONTS.h4
            }}
            >{label}</Text>
        </View>
        )
    }
   
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle:{
        height: 25,
        width: 25,
    },
    tradeContainer:{
        alignItems:'center',
        justifyContent:'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.black
    }
})

//make this component available to the app
export default Tabicon;
