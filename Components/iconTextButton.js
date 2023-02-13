//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';
// create a component
const IconTextButton = ({
    containerStyle,
    icon,
    iconStyle,
    lable,
    labelStyle,
    onPress = ()=>{}
}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{ ...styles.container, ...containerStyle }}>
            <Image
                source={icon}
                style={{ ...styles.iconStyle,...iconStyle }}
            />
            <Text style={{...styles.labelStyle,...labelStyle}}>
                {lable}
            </Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    labelStyle:{
        marginLeft: SIZES.base,
        ...FONTS.h3
    }
});

//make this component available to the app
export default IconTextButton;
