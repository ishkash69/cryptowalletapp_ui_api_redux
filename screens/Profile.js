import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { MainLayout } from './';
import { SIZES, icons, FONTS, COLORS } from '../constants';
import { HeaderBar } from '../Components';
import { height } from '../src/styles/responsiveSize';


const Profile = () => {
    return (
        <MainLayout>
            <View style={styles.container}>
                <HeaderBar
                    title={"Profile"}
                />
                <View style={styles.buttonView}>
                    <Image
                        source={{ uri: 'data:image/png;base64,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' }}
                        style={styles.image}
                    />
                    <Text style={styles.dummyText}>
                        To Connect to a Wallet Press the Button below.
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonTouchable}
                    >
                        <Text style={styles.buttonText}>CONNECT WALLET</Text>

                    </TouchableOpacity>
                </View>

            </View>
        </MainLayout>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    buttonView: {
        backgroundColor: COLORS.gray1,
        flex: 0.99,
        borderRadius: SIZES.padding,
        justifyContent: 'center',
    },
    buttonTouchable: {
        height: 40,
        backgroundColor: COLORS.lightGray3,
        width: "50%",
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: SIZES.padding
    },
    buttonText: {
        color: COLORS.white,
        ...FONTS.h4,
        textAlign: 'center'
    },
    dummyText: {
        color: COLORS.lightGray3,
        ...FONTS.body4,
        alignSelf: 'center',
        marginBottom: SIZES.padding
    },
    image: {
        alignSelf: 'center',
        height: 300,
        width: 300,
        borderRadius: 10,
        marginBottom: SIZES.padding
    }
})
export default Profile;