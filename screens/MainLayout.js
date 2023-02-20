//import liraries
import React, { Component,useEffect,useRef } from 'react';
import { View, Text, StyleSheet,Animated } from 'react-native';
import { COLORS,SIZES,icons } from '../constants';
import { IconTextButton } from '../Components';
import { store } from '../redux/store';
import tab from '../redux/actions/index'
import { withDecay } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
// create a component
const MainLayout = ({children}) => {
    let modalStatus = useSelector(state => state?.tabReducers?.isModalVisible)

    const modalAnimatedVal = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        if(modalStatus){
            Animated.timing(modalAnimatedVal,{
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }else{
            Animated.timing(modalAnimatedVal,{
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
            }).start();
        }
    },[modalStatus])

    const modalY = modalAnimatedVal.interpolate({
        inputRange:[0,1],
        outputRange: [SIZES.height,SIZES.height-280]
    })
    return (
        <View style={styles.container}>
            {children}
            {/* Dim background */}
            {modalStatus && 
            <Animated.View
            style={{
                position:'absolute',
                top:0,
                left:0,
                right:0,
                bottom:0,
                backgroundColor: COLORS.transparentBlack
            }}
            opacity = {modalAnimatedVal}
            />
            }
            {/* Modal */}
            <Animated.View
            style={{...styles.animated,top: modalY}}
            >
                <IconTextButton
                lable={"Transfer"}
                icon={icons.send}
                onPress ={()=> console.log("transfer")}
                />
                 <IconTextButton
                lable={"Withdraw"}
                icon={icons.withdraw}
                containerStyle ={{
                    marginTop: SIZES.base
                }}
                onPress ={()=> console.log("withdraw")}
                />
            </Animated.View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    animated:{
        position:"absolute",
        left: 0,
        width: '100%',
        padding: SIZES.padding,
        backgroundColor: COLORS.primary
    }
    
});

//make this component available to the app
export default MainLayout;
