import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Background from './Background';
import Field from './Field';
import Btn from './Btn';

const StudentLogin = ({ navigation }) => { // Destructure navigation from props
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const usersRef = firestore().collection('students');
            const querySnapshot = await usersRef.where('email', '==', email).get();

            if (querySnapshot.empty) {
                throw new Error('No user found with this email.');
            }

            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            console.log(userData.class);

            if (password !== userData.password) {
                throw new Error('Invalid password');
            }
            
            // Pass email, password, and class to the dashboard navigation parameters
            navigation.navigate("StudentDashboard", { email: email, password: password, classes: userData.class });
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
                <Field placeholder="Email" keyboardType={"email-address"} value={email} onChangeText={setEmail}/>
                <Field placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword}/>
                <View style={styles.forgotView}>
                    <Text style={styles.forgot} onPress={handleForgotPassword}>Forgot Password?</Text>
                </View>
                <Btn pad={12} bgColor='black' textColor='white' btnText='Login' Press={handleLogin}/>
                <Text style={styles.error}>{message}</Text>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: '100%',
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
    error:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 10,
    },
});

export default StudentLogin;
