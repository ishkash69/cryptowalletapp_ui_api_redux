
import React, { useCallback, useEffect, useState } from 'react';
import { render } from 'react-dom';
import {
    FlatList, Image, StyleSheet, Text, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BalanceInfo, IconTextButton } from '../Components';
import ChartComp from '../Components/Chart';
import SearchComp from '../Components/SearchComponent';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { holdings } from '../constants/dummy';
import actions from '../redux/actions';
import { MainLayout } from './';

const Portfolio = () => {
    const [coins, setCoins] = useState([])
    const [coinsPage, setCoinsPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [state, setState] = useState({
        currency: 'usd',
        orderBy: 'market_cap_desc',
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
        getHoldings()
    }, [])

    const getHoldings = useCallback(async () => {
        let ids = holdings.map((item) => {
            return item.id
        }).join(',')
        let query = `vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`
        await actions.getHoldings(query).then(res => {
            let myHolding = res.map((item) => {
                let coin = holdings.find(a => a.id == item.id)
                let price7d = item.current_price /
                    (1 + item.price_change_percentage_7d_in_currency * 0.01)
                return {
                    id: item.id,
                    symbol: item.symbol,
                    image: item.image,
                    name: item.name,
                    current_price: item.current_price,
                    qty: coin.qty,
                    total: coin.qty * item.current_price,
                    priceChangePercentage7d: item.price_change_percentage_7d_in_currency,
                    holding_value_change_7d: (item.current_price - price7d) * coin.qty,
                    sparkline_in_7d:
                    {
                        value: item.sparkline_in_7d.price.map(
                            (price) => {
                                return price * coin.qty
                            })
                    }

                }
            })
            updateState({ myHoldings: myHolding })
            console.log(myHoldings, "My holdings")
        })
    }, [currency, myHoldings])
    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)
    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
    let percChange = valueChange / (totalWallet - valueChange) * 100
    const walletInfoSection = useCallback(() => {
        return (
            <View
                style={styles.headerContainer}
            >
                <Text style={styles.portfolioText}>Portfolio</Text>
                {/* Balance info  */}
                <BalanceInfo
                    containerStyle={{
                        marginTop: SIZES.radius,
                        marginBottom: SIZES.padding
                    }}
                    title="Current Balance"
                    displayAmount={totalWallet ? totalWallet : 0}
                    changePct={percChange ? percChange.toFixed(2) : 0}
                    currency={currency}
                />
            </View>
        )
    }, [])
    const renderItem = useCallback(({ item, index }) => {
        let priceColor = item?.priceChangePercentage7d == 0 ?
            COLORS.lightGray3 : (item?.priceChangePercentage7d > 0) ?
                COLORS.lightGreen : COLORS.red
        return (
            <TouchableOpacity
            onPress={()=>{
                updateState({selectedCoin: item})
            }}
            key={index} style={styles.renderView}>
                {/* Asset */}
                <View style={styles.assetRenderView}>
                    <Image
                        style={styles.assetImage}
                        source={{ uri: item?.image }} />
                    <Text style={styles.renderItemPrice}>{item?.name}</Text>
                </View>
                {/* Price */}
                <View
                    style={styles.renderPriceView}
                >
                    <Text style={styles.renderItemprice}>$ {item?.current_price.toLocaleString()}</Text>

                    <View style={styles.percentagePriceView}>
                        {item?.price_change_percentage_7d_in_currency != 0 &&
                            <Image
                                source={icons.upArrow}
                                style={{
                                    ...styles.iconUpArrow,
                                    tintColor: priceColor,
                                    transform: (item?.priceChangePercentage7d > 0) ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
                                }}
                            />
                        }
                        <Text style={{marginLeft: 5,
                        color: priceColor,
                        ...FONTS.body5,
                        lineHeight:15
                        }}>{item?.priceChangePercentage7d.toFixed(2)} %</Text>
                    </View>
                </View>
                {/* Holdings */}

                <View
                    style={styles.renderPriceView}
                >
                    <Text style={styles.renderItemprice}>$ {item?.total?.toLocaleString()}</Text>
                    <Text style={{textAlign: 'right',
                color:COLORS.lightGray3,
                ...FONTS.body5,
                lineHeight: 15
                }}>
                        {item?.qty} {item?.symbol?.toUpperCase()}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }, [])
    return (
        <MainLayout>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}>
                {/* Header & wallet info  */}
                {walletInfoSection()}
                {/* Chart Section */}
                <ChartComp
                    chartPrices={selectedCoin? selectedCoin?.sparkline_in_7d?.value:
                         myHoldings[0]?.sparkline_in_7d?.value}
                />

                {/* <SearchComp
                    value={searchQuery}
                    containerStyle={{ marginTop: 20 }}
                    placeholder={'Search'}
                    onChangeText={(q) => setSearchQuery(q)}
                /> */}
                {/* Your Assets */}
                <FlatList
                    data={myHoldings}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                {/* section */}
                                <Text style={styles.yourAssetText}>
                                    Your Assets
                                </Text>

                                {/* Header Label */}
                                <View style={styles.headerLabelView}>
                                    <Text style={styles.assetText}>Asset</Text>
                                    <Text style={{ ...styles.assetText, textAlign: 'right' }}>Price</Text>
                                    <Text style={{ ...styles.assetText, textAlign: 'right' }}>Holdings</Text>
                                </View>
                            </View>
                        )
                    }}
                    renderItem={renderItem}
                />
            </View>
        </MainLayout>

    )
}
const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: SIZES.padding,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: COLORS.gray
    },
    portfolioText: {
        marginTop: 50,
        color: COLORS.white,
        ...FONTS.largeTitle
    },
    yourAssetText: {
        ...FONTS.h2,
        color: COLORS.white
    },
    headerLabelView: {
        flexDirection: 'row',
        marginTop: SIZES.radius
    },
    assetText: {
        flex: 1,
        color: COLORS.lightGray3
    },
    renderView: {
        flexDirection: 'row',
        height: 55,
    },
    assetRenderView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    assetImage: {
        width: 20,
        height: 20
    },
    renderItemPrice: {
        color: COLORS.white,
        ...FONTS.h4,
        marginLeft: SIZES.radius
    },
    renderPriceView: {
        flex: 1,
        justifyContent: 'center'
    },
    renderItemprice: {
        textAlign: "right",
        color: COLORS.white,
        ...FONTS.h4,
        lineHeight: 15
    },
    percentagePriceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    iconUpArrow: {
        width: 10,
        height: 10,
        alignSelf: 'center',
    },
})

export default Portfolio;