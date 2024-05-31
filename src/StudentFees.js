import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Background1 from './Background1';
import firestore from '@react-native-firebase/firestore';

const StudentFees = ({ registrationNumber }) => {
    const [feesInfo, setFeesInfo] = useState(null);

    useEffect(() => {
        const fetchStudentFees = async () => {
            try {
                const feeDoc = await firestore().collection('fee').doc(registrationNumber.toString()).get();

                if (!feeDoc.exists) {
                    throw new Error('No fee information found for this student.');
                }

                const feeData = feeDoc.data();

                const totalFees = feeData.payable_amount;
                const feeStatus = feeData.late_fees ? 'Paid' : 'Unpaid';

                setFeesInfo({ totalFees, feeStatus });
            } catch (error) {
                Alert.alert(error.message);
                setFeesInfo(null);
            }
        };

        fetchStudentFees();
    }, [registrationNumber]);

    return (
        <Background1>
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
        </Background1>
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
