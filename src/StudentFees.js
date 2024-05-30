import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Background from './Background';
import firestore from '@react-native-firebase/firestore';

const StudentFees = (props) => {
    const { email, password } = props;
    const [feesInfo, setFeesInfo] = useState(null);

    useEffect(() => {
        const fetchStudentFees = async () => {
            try {
                const usersRef = firestore().collection('students');
                const querySnapshot = await usersRef.where('email', '==', email).where('password', '==', password).get();

                if (querySnapshot.empty) {
                    throw new Error('No user found with this email and password.');
                }

                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();

                const totalFees = userData.fees;
                const feeStatus = userData.feeStatus ? 'Paid' : 'Unpaid';

                setFeesInfo({ totalFees, feeStatus });
            } catch (error) {
                Alert.alert(error.message);
                setFeesInfo(null);
            }
        };

        fetchStudentFees();
    }, [email, password]);

    return (
        <Background>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {feesInfo && (
                        <View style={styles.resultContainer}>
                            <View style={styles.tile}>
                                <Text style={styles.tileTitle}>Total Fees</Text>
                                <Text style={styles.tileContent}>{feesInfo.totalFees}</Text>
                            </View>
                            <View style={styles.tile}>
                                <Text style={styles.tileTitle}>Fee Status</Text>
                                <Text style={styles.tileContent}>{feesInfo.feeStatus}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </Background>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    container: {
        padding: 20,
        flexGrow: 1,
    },
    resultContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tile: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        width: '45%',
    },
    tileTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: 'black',
    },
    tileContent: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
    },
});

export default StudentFees;
