//import liraries
import React, { Component, useDebugValue } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import moment, { max } from 'moment';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart'
import { round } from 'react-native-reanimated';


// create a component
const ChartComp = ({
    contanerStyle,
    chartPrices,
}) => {
    // points 
    let startUnixTimestamp = moment().subtract(7, 'day').unix()

    let data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            x: startUnixTimestamp + (index + 1) * 3600,
            y: item
        }
    }) : []
    const formatNumber = (value, roundingPoint) => {
        if (value > 1e9) {
            return `${(value / 1e9).toFixed(roundingPoint)}B`
        } else if (value > 1e6) {
            return `${(value / 1e6).toFixed(roundingPoint)}M`
        } else if (value > 1e3) {
            return `${(value / 1e3).toFixed(roundingPoint)}K`
        } else {
            return value.toFixed(roundingPoint)
        }
    }

    const getYAxisLableValues = () => {
        if (chartPrices !== undefined) {
            let minValue = Math.min(...chartPrices)
            let maxValue = Math.max(...chartPrices)
            let midValue = (minValue + maxValue) / 2

            let higherMidValue = (maxValue + midValue) / 2
            let lowerMidValue = (minValue + midValue) / 2

            let roundingPoint = 2
            return [
                formatNumber(maxValue, roundingPoint),
                formatNumber(higherMidValue, roundingPoint),
                formatNumber(lowerMidValue, roundingPoint),
                formatNumber(minValue, roundingPoint)
            ]
        } else {
            return []
        }
    }
    return (
        <View style={{ ...styles.container, ...contanerStyle }}>

            {/* y axis lable */}
            <View style={styles.yAxis}>
                {
                    getYAxisLableValues().map((item, index) => {
                        return (
                            <Text
                                style={{
                                    color: COLORS.lightGray3,
                                    ...FONTS.body4
                                }}
                                key={index}>{item}</Text>
                        )
                    })
                }
            </View>
            {/* Chart */}
            {data.length > 0 && <Chart
                style={{ height: 150, width: SIZES.width }}
                data={data}
                viewport={{ size: { width: SIZES.width * 300 } }}
                // padding={{ left: 50, bottom: 0, right: 50, top: 40 }}
                // yDomain={{ min: Math.min(...chartPrices), max: Math.max(...chartPrices) }}
            >
                <Line
                    smoothing="bezier"
                    theme={{ stroke: { color: COLORS.lightGreen, width: 2 } }}
                    tooltipComponent={
                        <Tooltip
                            theme={{
                                label: { fontSize: 20, dx: 50, dy: -10, },
                                shape: { opacity: 0, },
                                formatter: ({ y }) => `$${y.toFixed(2)}`
                            }} />
                    } />
            </Chart>
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.padding * 2
    },
    yAxis: {
        position: "absolute",
        left: SIZES.padding,
        top: 0,
        bottom: 0,
        justifyContent: 'space-between'
    }
});

//make this component available to the app
export default ChartComp
