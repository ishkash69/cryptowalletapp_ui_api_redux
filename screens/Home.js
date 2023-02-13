import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView
} from 'react-native';
import { MainLayout } from './';
import actions from '../redux/actions';
import { holdings } from '../constants/dummy';
import { cos } from 'react-native-reanimated';
import { compose } from 'redux';
const Home = () => {
    const [state, setState] = useState({
        holdings : [],
        currency: 'usd',
        orderBy: 'market_cap_desc',
        perPage: 10,
        page: 1,
        sparkline: true,
        priceChangePerc: '7d',
        category: ''
    })
    const {
        currency,
        orderBy,
        perPage,
        page,
        sparkline,
        priceChangePerc,
        category    
    } = state
    const updateState = (data) => setState((state)=>({...state,...data}))
    useEffect(()=>{
        getHoldings()
    },[currency])

    const getHoldings = useCallback( ()=>{
        let ids = holdings.map((item)=>{
            return item.id
        }).join(',')
        let query =`vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`
            actions.getHoldings(query).then(res=>{
                console.log(res,'this is response')
            })
    },[currency])

    return (
        <MainLayout>
            <View style={{ flex: 1 }}>
                <Text>Home</Text>
            </View>
        </MainLayout>

    )
}

export default Home;