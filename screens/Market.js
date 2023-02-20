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
import { compose } from 'redux';


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
        orderBy: 'market_cap_rank',
        perPage: 10,
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
        let query = `vs_currency=${currency}&order=${orderBy}&per_page=${10}&page=${coinsPage}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`

        actions.getHoldings(query).then(res => {
            // console.log(res, 'res>>>>')
            coinsPage === 1 ? setCoins(res) : setCoins([...coins, ...res])
            console.log(coins, "<<<<<?>>>>>")
            setCoinsPage(coinsPage + 1)
            console.log(coinsPage, "page<<>>")
        })
    }, [coinsPage])

    const Tabs = useCallback(() => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {/* Tabs */}

                {marketTabs.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={`marketTab-${index}`}
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
    }, [])


    const renderTabBar = useCallback(() => {
        return (
            <View style={styles.renderTabBar}>
                <Tabs />
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

    const scrollX = useRef(new Animated.Value(0)).current;

    const renderItem = useCallback(({ item, index }) => {
        console.log(item,"items<<?????")
        return (
            <View style={{
                flex: 1,
                width: SIZES.width
            }}>
                <FlatList
                    data={coins}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        console.log(item,"item>>>")
                        let priceColor = (item?.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3
                            : (item?.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red
                        return (
                            <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: SIZES.padding,
                                marginBottom: SIZES.radius
                            }}>
                                {/* Coins  */}
                                <View
                                style={{flex: 1.5,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                >
                                    <Image
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                    source={{uri: item?.image}}/>
                                </View>
                                {/* LineChart */}

                                {/* Figures */}
                            </View>
                        )
                    }}
                />

            </View>
        )
    }, [])

    const renderList = useCallback(() => {
        <Animated.FlatList
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
    }
})

export default Market;