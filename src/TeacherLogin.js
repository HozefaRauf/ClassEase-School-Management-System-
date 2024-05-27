import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Background from './Background';
import Field from './Field';
import Btn from './Btn';

const TeacherLogin = (props) => {
    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.login}>Login</Text>
                <Field placeholder="Email" keyboardType={"email-address"}/>
                <Field placeholder="Password" secureTextEntry={true}/>
                <View style={styles.forgotView}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </View>
                <Btn pad={12} bgColor='black' textColor='white' btnText='Login' Press={() =>props.navigation.navigate("Practice")}/>

            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: 420,
       
        
    },
    login:{
        fontSize: 45,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 170,
        alignSelf: 'center',
        marginBottom: 50,

    },
    forgot:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 2,
        marginBottom: 20,
    },
    forgotView:{
        alignSelf: 'flex-end',
        marginRight: 42,
    },
    
})

export default TeacherLogin;
