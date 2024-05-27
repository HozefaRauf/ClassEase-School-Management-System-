import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const Background = ({ children }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/bg1.jpg')} style={styles.backgroundImage}>
                <View style={styles.content}>
                    {children}
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    content: {
        flex: 1,
        position: 'relative',
    },
});

export default Background;
