import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
    Image,
    StyleSheet,
} from 'react-native';
import { MainLayout } from './';
import { SIZES, icons, FONTS, COLORS, constants } from '../constants'
import actions from '../redux/actions';
import { HeaderBar } from '../Components';
import { LineChart } from 'react-native-chart-kit';
import { transform } from '@babel/core';
import { Chart, Line } from 'react-native-responsive-linechart';
import { makeMutable } from 'react-native-reanimated';
import { height } from '../src/styles/responsiveSize';



const marketTabs = constants.marketTabs.map((marketTabs) => ({
    ...marketTabs,
    ref: createRef()
}))
const Market = () => {
    const [coins, setCoins] = useState([])
    const [coinsPage, setCoinsPage] = useState(1)
    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [state, setState] = useState({
        currency: 'usd',
        orderBy: 'market_cap_desc',
        perPage: 30,
        page: 1,
        sparkline: true,
        priceChangePerc: '7d',
        category: '',
        holdingsId: [],
        myHoldings: [],
        selectedCoin: null
    })
    const {
        currency,
        orderBy,
        perPage,
        page,
        sparkline,
        priceChangePerc,
        myHoldings,
        selectedCoin
    } = state
    let loadMoare = true
    const updateState = (data) => setState((state) => ({ ...state, ...data }))


    useEffect(() => {
        getCoinMaket()
    }, [])

    const getCoinMaket = useCallback(async () => {
        let query = `vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${coinsPage}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`

        actions.getHoldings(query).then(res => {
            // console.log(res, 'res>>>>')
            coinsPage === 1 ? setCoins(res) : setCoins([...coins, ...res])
            console.log(coins, "<<<<<?>>>>>")
            setCoinsPage(coinsPage + 1)
            console.log(coinsPage, "page<<>>")
        })
    }, [coinsPage])
    const scrollX = useRef(new Animated.Value(0)).current;
    const marketTabScrollViewRef = useRef()
    const onMarketTabPress = useCallback(marketTabIndex=>{
        marketTabScrollViewRef?.current?.scrollToOffset({
            offset: marketTabIndex* SIZES.width
        })
    },[])
    const TabIndicator = ({ scrollX, measureLayout }) => {
        const inputRange = marketTabs.map((_, i) => i * SIZES.width)
        const translateX = scrollX.interpolate({
            inputRange,
            outputRange: measureLayout.map(measure => measure.x)
        })
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    height: "100%",
                    width: (SIZES.width - (SIZES.radius * 2)) / 2,
                    borderRadius: SIZES.padding,
                    backgroundColor: COLORS.lightGray,
                    transform: [{
                        translateX
                    }]
                }}
            />
        )
    }

    const Tabs = ({ scrollX , onMarketTabPress}) => {
        const [measureLayout, setMeasureLyout] = useState([])
        const containerRef = useRef()

        useEffect(() => {
            let ml = []
            marketTabs.forEach(marketTab => {
                marketTab?.ref?.current?.measureLayout(
                    containerRef.current,
                    (x, y, width, height) => {
                        ml.push({
                            x, y, width, height
                        })
                        if (ml.length === marketTabs.length) {
                            setMeasureLyout(ml)
                        }
                    }
                )
            })
        }, [containerRef.current])
        return (
            <View
                ref={containerRef}
                style={{ flexDirection: 'row' }}>
                {/* Tab Indicator */}
                {measureLayout.length > 0 &&
                    <TabIndicator
                        measureLayout={measureLayout}
                        scrollX={scrollX}
                    />
                }
                {/* Tabs */}
                {marketTabs.map((item, index) => {
                    return (
                        <TouchableOpacity
                        onPress={()=>onMarketTabPress(index)}
                            key={`MarketTab-${index}`}
                            style={{ flex: 1 }}
                        >
                            <View
                                ref={item.ref}
                                style={styles.tabTouchable}
                            >
                                <Text style={styles.tabLable}>{item?.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }


    const renderTabBar = useCallback(() => {
        return (
            <View style={styles.renderTabBar}>
                <Tabs
                    scrollX={scrollX}
                    onMarketTabPress={onMarketTabPress}
                    />
            </View>
        )
    }, [])

    const renderButton = useCallback((label, containerStyle, onPress = () => { }) => {
        return (
            <View style={styles.renderButtonContainer}>
                <TouchableOpacity
                    onPress={onPress}
                    style={{ ...styles.textBtnContainer, ...containerStyle }}>
                    <Text style={{
                        color: COLORS.white,
                        ...FONTS.h3
                    }}>{label}</Text>
                </TouchableOpacity>

            </View>
        )
    }, [])

   

    const renderItem = useCallback(({ item, index }) => {
        return (
            <View style={{
                flex: 1,
                width: SIZES.width
            }}>
                <FlatList
                    data={coins}
                    keyExtractor={item => item.id}
                    onEndReached={getCoinMaket}
                    onEndReachedThreshold={5}
                    renderItem={({ item, index }) => {
                        console.log(item.sparkline_in_7d.price, "item<><><><>?")
                        let priceColor = (item?.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3
                            : (item?.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red
                        return (
                            <View style={styles.flatListMain}>
                                {/* Coins  */}
                                <View
                                    style={styles.flatListCoinsMain}
                                >
                                    <Image
                                        style={styles.coinsIcon}
                                        source={{ uri: item?.image }} />
                                    <Text style={styles.coinsName}>{item?.name}</Text>
                                </View>
                                {/* LineChart */}
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center'
                                    }}
                                >
                                    <LineChart
                                        withVerticalLabels={false}
                                        withHorizontalLabels={false}
                                        withDots={false}
                                        withInnerLines={false}
                                        withVerticalLines={false}
                                        data={{
                                            datasets: [
                                                {
                                                    data: item?.sparkline_in_7d?.price
                                                }
                                            ]
                                        }}
                                        width={100}
                                        height={60}
                                        chartConfig={{
                                            color: () => priceColor,
                                            strokeWidth: 1,
                                        }}
                                        bezier
                                        style={{
                                            paddingRight: 0,
                                        }}


                                    />
                                </View>
                                {/* Figures */}

                                <View style={styles.figuresMain}>
                                    <Text style={styles.currentPrice}>$ {item?.current_price}</Text>
                                    <View style={styles.percentageView}>
                                        <Image
                                            source={icons.upArrow}
                                            style={{
                                                height: 10,
                                                width: 10,
                                                tintColor: priceColor,
                                                transform: (item?.price_change_percentage_7d_in_currency > 0 ?
                                                    [{ rotate: '45deg' }] : [{ rotate: '125deg' }])
                                            }}
                                        />
                                        <Text
                                            style={[styles.percentageText, { color: priceColor }]}
                                        >{item?.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />

            </View>
        )
    }, [])

    const renderList = useCallback(() => {
        return (
            <Animated.FlatList
                ref={marketTabScrollViewRef}
                data={marketTabs}
                contentContainerStyle={{
                    marginTop: SIZES.padding,
                }}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={
                    Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ], {
                        useNativeDriver: false
                    })
                }
                renderItem={renderItem}
            />
        )
    }, [])
    return (
        <MainLayout>
            <View style={styles.container}>
                {/* Header Bar */}
                <HeaderBar
                    title={"Market"}
                />
                {/* Tabbar  */}
                {renderTabBar()}
                {/* Buttons */}
                <View style={{ flexDirection: 'row' }}>
                    {renderButton("USD")}
                    {renderButton("% (7d)", { marginLeft: SIZES.base })}
                    {renderButton("Top", { marginLeft: SIZES.base })}
                </View>
                {/* Market List */}
                {renderList()}
            </View>
        </MainLayout>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black
    },
    renderTabBar: {
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray
    },
    tabTouchable: {
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    tabLable: {
        color: COLORS.white,
        ...FONTS.h3
    },
    textBtnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
    },
    renderButtonContainer: {
        marginTop: SIZES.radius,
    },
    flatListMain: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        marginBottom: SIZES.radius,
    },
    flatListCoinsMain: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    coinsIcon: {
        height: 20,
        width: 20
    },
    coinsName: {
        color: COLORS.white,
        ...FONTS.h4,
        marginLeft: SIZES.padding
    },
    figuresMain: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: 'center'
    },
    currentPrice: {
        color: COLORS.white,
        ...FONTS.h4
    },
    percentageView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    percentageText: {
        marginLeft: 5,
        ...FONTS.body5
    }
})

export default Market;