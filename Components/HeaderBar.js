//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES,COLORS,icons, FONTS } from '../constants';
// create a component
const HeaderBar = ({
    title,
    containerStyle,
    titleStyle
}) => {
    return (
        <View style={{...styles.container,...containerStyle}}>
            <Text style={{...styles.titleStyle,...titleStyle}}>{title}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
       height: 100,
       paddingHorizontal: SIZES.radius,
       justifyContent: 'flex-end'
    },
    titleStyle: {
        color: COLORS.white,
        ...FONTS.largeTitle
    }
});

//make this component available to the app
export default HeaderBar;
