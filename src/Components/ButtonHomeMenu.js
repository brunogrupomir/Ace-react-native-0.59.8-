import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import Styles from './StylesPattern'
import Icon from 'react-native-vector-icons/FontAwesome5'


const ButtonHomeMenu = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPage}>
            <View style={styles.container}>
                <View style={styles.containerButton}>
                    <Icon name={props.icon} size={60} style={styles.icon} />
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default ButtonHomeMenu;

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 200,
        backgroundColor: Styles.cor.branco,
        marginLeft: 20,
        marginBottom: 20,
        borderRadius: 10,
        // borderWidth: 1,
        // borderColor: Styles.cor.azul,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,

    },
    icon: {
        color: Styles.cor.azul
    },
    containerButton: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: Styles.size.medio,
        fontFamily: Styles.font.helvetica,
        color: Styles.cor.azul
    },
});