import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const Home = () => {
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

    const searchTimeout = useRef(null);
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';


    useEffect(() => {
        getHoldings()
        getCoinMaket()
    }, [])

    const getHoldings = useCallback(async () => {
        let ids = holdings.map((item) => {
            return item.id
        }).join(',')
        let query = `vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`
        await actions.getHoldings(query).then(res => {
            console.log(res, 'this is response')
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
        })
    }, [currency, myHoldings])

    // const getIds = useCallback(() => {
    //     const include_platfrom = true
    //     let query = `include_platform=${include_platfrom}`
    //     actions.getId(query).then(res => {
    //         // console.log(res,"ids ids ids ids>>>>>>??????")
    //         holdingsId.push(res)
    //         console.log(holdingsId, 'this is holdings id')
    //     })
    // },[])
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

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)
    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
    let percChange = valueChange / (totalWallet - valueChange) * 100
    const walletInfoSection = useCallback(() => {
        return (
            <View
                style={styles.headerContainer}
            >
                {/* Balance info  */}
                <BalanceInfo
                    containerStyle={{ marginTop: 50 }}
                    title="Your Wallet"
                    displayAmount={totalWallet ? totalWallet : 0}
                    changePct={percChange ? percChange.toFixed(2) : 0}
                    currency={currency}
                />
                {/* Button */}
                <View style={styles.IconTextButtonContainer}>
                    <IconTextButton
                        lable={"Transfer"}
                        icon={icons.send}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius
                        }}
                        onPress={() => console.log("transer")}
                    />
                    <IconTextButton
                        lable={"withdraw"}
                        icon={icons.send}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                        }}
                        onPress={() => console.log("withdraw")}
                    />

                </View>
            </View>
        )
    }, [])
    // console.log(coins[0]?.sparkline_in_7d?.price, 'coins?>>>>>'
    const renderItem = useCallback(({ item, index }) => {
        let priceColor = (item.
            price_change_percentage_7d_in_currency === 0)
            ? COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0)
                ? COLORS.lightGreen : COLORS.red
        return (
            <TouchableOpacity
                style={{
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
                onPress={() => {
                    updateState({ selectedCoin: item })
                    // console.log(selectedCoin, 'selected coin>>>??')
                }}
            >
                {/*Logo */}
                <View style={{
                    width: 35
                }}>
                    <Image
                        style={{
                            height: 20,
                            width: 20
                        }}
                        source={{ uri: item.image }}
                    />
                </View>
                {/* Name */}
                <View
                    style={{ flex: 1 }}
                >
                    <Text style={{
                        color: COLORS.white,
                        ...FONTS.h3
                    }}>{item.name}</Text>
                </View>
                {/* Figures */}
                <View>
                    <Text style={{
                        textAlign: 'right',
                        color: COLORS.white,
                        ...FONTS.h4
                    }}>$ {item.current_price}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        {
                            item.price_change_percentage_7d_in_currency != 0 &&
                            <Image
                                source={icons.upArrow}
                                style={{
                                    height: 10,
                                    width: 10,
                                    tintColor: priceColor,
                                    transform: item?.price_change_percentage_7d_in_currency > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
                                }}
                            />
                        }
                        <Text style={{
                            color: priceColor,
                            marginLeft: 5,
                            ...FONTS.body5,
                            lineHeight: 15
                        }}>{item?.price_change_percentage_7d_in_currency?.toFixed(2)}%</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    })
    const searchFilter = useCallback((text) => {
        if (text) {
          const newData = coins.filter((item) => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const searchText = text.toUpperCase();
            return itemData.indexOf(searchText) > -1;
          });
          setFilteredData(newData);
          setSearch(text);
        } else {
          setFilteredData(coins);
          setSearch(text);
        }
      },[search]);
    // useEffect(()=>{
    //     const searchInterval = setTimeout(()=>{
    //             let searchObj = {}
    //         if(search.trim()){
    //             searchObj.searchText = search;
    //         }
    //         console.log("search object", searchObj)
    //         if(searchObj.searchText){
    //             searchCoin(search)
    //         }
    //     },600)
    //     return()=>{
    //         if(searchInterval){
    //             clearInterval(searchInterval)
    //         }
    //     }
    // },[search])
    // const searchCoin = async (text)=>{
    //     try {
    //         let query = `vs_currency=${currency}&per_page=${10}&search=${text}`
    //         const res = await actions.getHoldings(query)
    //         console.log('search result',res)
    //         if(res){
    //             setCoins(res)
    //         }
    //     } catch (error) {
    //         console.log(error,'error raised')
    //     }
    // }
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
                    chartPrices={selectedCoin ? selectedCoin?.
                        sparkline_in_7d?.price :
                        coins[0]?.sparkline_in_7d?.price}
                />

                <SearchComp
                    value={search}
                    containerStyle={{ marginTop: 20 }}
                    placeholder={'Search'}
                    onChangeText={(q)=>searchFilter(q)}
                />

                <FlatList
                    data={search ? filteredData : coins}
                    contentContainerStyle={{
                        paddingHorizontal: SIZES.padding,
                        marginTop: 30,
                    }}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{
                                marginBottom: SIZES.radius,
                            }} >
                                <Text style={{
                                    color: COLORS.white,
                                    ...FONTS.h3,
                                    fontSize: 20
                                }}>Top CryptoCurrency</Text>
                            </View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View style={{
                                marginBottom: 30
                            }}>
                            </View>
                        )
                    }}
                    renderItem={renderItem}
                    onEndReached={() => {
                        getCoinMaket()
                        console.log('onendreached called')
                    }}
                    onEndReachedThreshold={0.1}

                />
                {/* </View> */}

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
    IconTextButtonContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: -15,
        paddingHorizontal: SIZES.radius
    }
})

export default Home;