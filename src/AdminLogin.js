import React, { useState } from'react';
import { StyleSheet, View, Text,ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import Background from './Background';
import Field from './Field';
import Btn from './Btn';

const AdminLogin = (props) => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLogin = async () => {
        try {
            setLoading(true);
            // console.log('email =>', email);
            // console.log('password =>', password);
            const response = await auth().signInWithEmailAndPassword(email, password);
            console.log(response);
            setMessage('');
            props.navigation.navigate("AdminDashboard");
            
        } catch (error) {
            console.log(error);
            setMessage(error.message);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }


    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.login}>Login</Text>
                <Field placeholder="Email" keyboardType={"email-address"} value={email} onChangeText={value=>setEmail(value)}/>
                <Field placeholder="Password" secureTextEntry={true} value={password} onChangeText={value=>setPassword(value)}/>
                <View style={styles.forgotView}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
})

export default AdminLogin;
