import React, { useState } from "react";
import {
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Tabicon } from "../Components";
import { Home, Portfolio, Market, Profile } from "../screens"
import { COLORS, icons } from "../constants"
import { useSelector } from "react-redux";
import tab from '../redux/actions'
const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({
    children,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={onPress}
        >
            {children}

        </TouchableOpacity>
    )
}

const Tabs = () => {

    let modalStatus = useSelector(state => state?.tabReducers?.isModalVisible)
    const onTradeButton = () => {
        tab.tradeModalAction(!modalStatus)
        console.log(modalStatus)
    }

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    height: 140,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(!modalStatus){
                            return (
                                <Tabicon
                                     focused={focused}
                                     icon={icons.home}
                                     label='Home'
                                 /> 
                             )
                        }
                        
                    }
                }}
                listeners = {{
                    tabPress: e =>{
                        if(modalStatus){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            (!modalStatus ? <Tabicon
                                focused={focused}
                                icon={icons.briefcase}
                                label='Portfolio'
                            /> : null)
                        )
                    }
                }}
                listeners = {{
                    tabPress: e =>{
                        if(modalStatus){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Tabicon
                                focused={focused}
                                icon={modalStatus? icons.close: icons.trade}
                                iconStyle={modalStatus? {
                                    height:15,
                                    width: 15,
                                }: null}
                                label='Trade'
                                isTrade={true}
                            />
                        )
                    },
                    tabBarButton: (props) => {
                        return (
                            <TabBarCustomButton
                                {...props}
                                onPress={() => {
                                    onTradeButton()
                                }}
                            />
                        )

                    }
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            (!modalStatus ? <Tabicon
                                focused={focused}
                                icon={icons.market}
                                label='Market'
                            /> : null)
                        )
                    }
                }}
                listeners = {{
                    tabPress: e =>{
                        if(modalStatus){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            (!modalStatus ? <Tabicon
                                focused={focused}
                                icon={icons.profile}
                                label='Profile'
                            /> : null)
                        )
                    }
                }}
                listeners = {{
                    tabPress: e =>{
                        if(modalStatus){
                            e.preventDefault()
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;