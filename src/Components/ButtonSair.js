import React from 'react';
import Styles from './StylesPattern'

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

const BtnSair = props => {
    return (
        <View>
            <TouchableOpacity onPress={props.action}>
                <View style={styles.container}>
                    <Text style={styles.title}>{props.nome}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default BtnSair;

const styles = StyleSheet.create({
    container: {
        width: 75,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Styles.cor.verde,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    title: {
        fontSize: Styles.size.peqeuna,
        fontFamily: Styles.font.helvetica,
        color: Styles.cor.branco
    }
})