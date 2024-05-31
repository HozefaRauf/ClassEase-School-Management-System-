import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Background1 from './Background1';
import Field from './Field';
import Btn from './Btn';

const AddFee = () => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [name, setName] = useState('');
    const [amountDue, setAmountDue] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [lateFees, setLateFees] = useState('');
    const [payableAmount, setPayableAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleAddData = async () => {
        if (!registrationNumber || !name || !amountDue || !amountPaid || !lateFees || !payableAmount || !paymentDate || !remarks) {
            Alert.alert('Missing Information', 'Please fill out all fields');
            return;
        }

        try {
            const studentReference = `students/${registrationNumber}`;
            const newFee = {
                registration_number: parseInt(registrationNumber),
                name,
                amount_due: parseInt(amountDue),
                amount_paid: parseInt(amountPaid),
                late_fees: lateFees === "true" ? true : false,
                payable_amount: payableAmount,
                payment_date: firestore.Timestamp.fromDate(new Date(paymentDate)),
                remarks,
                student: firestore().doc(studentReference)
            };

            await firestore().collection('fee').doc(registrationNumber).set(newFee);

            Alert.alert('Success', 'Fee added successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.login}>Add Fee</Text>
                    <Field placeholder="Enter Registration Number" keyboardType="numeric" value={registrationNumber} onChangeText={setRegistrationNumber} />
                    <Field placeholder="Enter Name" value={name} onChangeText={setName} />
                    <Field placeholder="Enter Amount Due" keyboardType="numeric" value={amountDue} onChangeText={setAmountDue} />
                    <Field placeholder="Enter Amount Paid" keyboardType="numeric" value={amountPaid} onChangeText={setAmountPaid} />
                    <Field placeholder="Enter Late Fees (true/false)" value={lateFees} onChangeText={setLateFees} />
                    <Field placeholder="Enter Payable Amount" value={payableAmount} onChangeText={setPayableAmount} />
                    <Field placeholder="Enter Payment Date (YYYY-MM-DD)" value={paymentDate} onChangeText={setPaymentDate} />
                    <Field placeholder="Enter Remarks" value={remarks} onChangeText={setRemarks} />

                    <Btn pad={12} bgColor='black' textColor='white' btnText='Save' Press={handleAddData} />
                </View>
            </ScrollView>
        </Background1>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    login: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 70,
        alignSelf: 'center',
        marginBottom: 20,
    },
});

export default AddFee;
