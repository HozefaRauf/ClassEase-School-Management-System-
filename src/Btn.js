import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';


export default function Btn({pad, bgColor, btnText, textColor, Press}) {
    return (
        <TouchableOpacity 
        onPress={Press}
        style={{
            backgroundColor: bgColor,
            borderRadius: 15,
            alignItems: 'center',
            width: 350,
            paddingVertical: pad,
            alignSelf: 'center',
            marginVertical: 6,
        }}>
            <Text style={{
                color: textColor,
                fontSize: 20,
                fontWeight: 'bold',
            }}>
                {btnText}
            </Text>
        </TouchableOpacity>
    );
}


