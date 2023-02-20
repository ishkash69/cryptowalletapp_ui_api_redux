//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SIZES, FONTS, COLORS, icons } from '../constants';
// create a component
const BalanceInfo = ({
    title,
    displayAmount,
    containerStyle,
    changePct,
    titleStyle,
    figuresContainer,
    currency
}) => {
    return (
        <View style={{ ...containerStyle, ...styles.container }}>
            {/* Title section */}
            <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
            {/* Figures Section */}
            <View style={{ ...figuresContainer, ...styles.figuresContainer }}>
                <Text style={styles.figuresStyle}>$</Text>
                <Text style={styles.amount}>{displayAmount.toLocaleString("en-US")}</Text>
                <Text style={styles.currency}>{" " + currency}</Text>
            </View>
            {/* Percentage section */}
            <View style={styles.percentageContainer}>
                {
                    changePct != 0 && (
                        <Image
                            source={icons.upArrow}
                            style={{
                                ...styles.iconUpArrow,
                                tintColor: changePct > 0 ? COLORS.lightGreen : COLORS.red,
                                transform: changePct > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
                            }}
                        />
                    )
                }

                <Text style={{
                    ...styles.changePct,
                    color: changePct == 0 ? COLORS.lightGray3
                        : changePct > 0 ? COLORS.lightGreen : COLORS.red
                }}>{changePct}%</Text>
                <Text style={{
                    marginLeft: SIZES.base,
                    alignSelf: "flex-end",
                    color: COLORS.lightGray3,
                    ...FONTS.h4
                }}>
                    7d change
                </Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    title: {
        color: COLORS.lightGray3,
        ...FONTS.h3
    },
    figuresContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    figuresStyle: {
        ...FONTS.h3,
        color: COLORS.lightGray3
    },
    amount: {
        ...FONTS.h2,
        color: COLORS.white,
        marginLeft: SIZES.base
    },
    currency: {
        ...FONTS.h3,
        color: COLORS.lightGray3
    },
    percentageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    iconUpArrow: {
        width: 10,
        height: 10,
        alignSelf: 'center',
    },
    changePct: {
        marginLeft: SIZES.base,
        alignSelf: "flex-end",
        ...FONTS.h4
    }
});

//make this component available to the app
export default BalanceInfo;
