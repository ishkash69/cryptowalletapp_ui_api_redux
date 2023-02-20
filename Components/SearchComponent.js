//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, icons } from '../constants';
import colors from '../src/styles/colors';
import { moderateScale, moderateScaleVertical } from '../src/styles/responsiveSize';

// create a component
const SearchComp = ({
    placeholder,
    placeholderTextColor,
    onPress = () => { },
    containerStyle,
    value,
    onChangeText = () => { }
}) => {
    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <View style={styles.inputContainer}>

                <Image style={{ height: 20, width: 20, tintColor: COLORS.lightGray3 }} source={icons.send} />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.input}
                    placeholderTextColor={colors.inActiveTxt}
                    placeholder={placeholder}
                />
            </View>
            <TouchableOpacity
                onPress={onPress}
                style={styles.filterContainer}>
                <Image style={styles.filterIcon} source={icons.trade} />
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(8)
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: '80%',
        borderRadius: moderateScale(30),
        borderWidth: 0.5,
        borderColor: colors.inActiveTxt,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScaleVertical(10)
    },
    input: {
        ...FONTS.h3,
        lineHeight: 0,
        color: colors.inActiveTxt,
        paddingHorizontal: moderateScale(12),
        width: '100%'
    },
    filterContainer: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScaleVertical(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(30),
        borderWidth: 0.5,
        borderColor: colors.inActiveTxt,
        height: 40
    },
    filterIcon: {
        height: moderateScale(25),
        width: moderateScale(25),
    }

});

//make this component available to the app
export default SearchComp;
