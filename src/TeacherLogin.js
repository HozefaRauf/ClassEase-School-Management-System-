import React, { useState } from'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Background from './Background';
import Field from './Field';
import Btn from './Btn';

const TeacherLogin = (props) => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        try {
            const usersRef = firestore().collection('teacher');
            const querySnapshot = await usersRef.where('email', '==', email).get();

            if (querySnapshot.empty) {
                throw new Error('No user found with this email.');
            }

            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            if (password !== userData.password) {
                throw new Error('Invalid password');
            }
            
            props.navigation.navigate("TeacherDashboard");
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleForgotPassword = () => {
        // Implement your logic here for password recovery, e.g., sending a password reset email
        Alert.alert('Forgot Password', 'Please contact your administrator for password recovery.');
    };
    
    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.login}>Login</Text>
                <Field placeholder="Email" keyboardType={"email-address"} value={email} onChangeText={value=>setEmail(value)}/>
                <Field placeholder="Password" secureTextEntry={true} value={password} onChangeText={value=>setPassword(value)}/>
                <View style={styles.forgotView}>
                    <Text style={styles.forgot} onPress={handleForgotPassword}>Forgot Password?</Text>
                </View>
                <Btn pad={12} bgColor='black' textColor='white' btnText='Login' Press={() =>handleLogin()}/>
                <Text style={styles.forgot}>{message}</Text>
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
