import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Btn from './Btn';


const Home = (props) => {
    return (
        <View style={styles.container}>
            
            
            <Image source={require('./assets/first_gif.gif')} style={styles.gif}/>
            <Text style={styles.text1}>ClassEase</Text>
            <Text style={styles.text2}>Welcome to ClassEase! Simplifying school management and enhancing communication between teachers and students.</Text>
            <Btn pad={15} bgColor='black' textColor='white' btnText='Student' Press={() =>props.navigation.navigate("StudentLogin")}/>
            <Btn pad={15} bgColor='black' textColor='white' btnText='Teacher' Press={() =>props.navigation.navigate("TeacherLogin")}/>
            <Btn pad={15} bgColor='black' textColor='white' btnText='Admin' Press={() =>props.navigation.navigate("AdminLogin")}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
    gif: {
        
        alignSelf: 'center',
        marginTop: 50,
    },
    text1:{
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginTop:-60,
        
    },
    text2:{
        fontSize: 15,
        textAlign: 'center',
        color: 'black',
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 80,
    }
});

export default Home;
