import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Background1 from './Background1';
import Field from './Field';
import Btn from './Btn';

const FeeDetail = ({ route, navigation }) => {
    const fee = route.params && route.params.fee ? route.params.fee : null;

    if (!fee) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Fee data not found</Text>
            </View>
        );
    }

    const [amountDue, setAmountDue] = useState(fee.amount_due.toString());
    const [amountPaid, setAmountPaid] = useState(fee.amount_paid.toString());
    const [lateFees, setLateFees] = useState(fee.late_fees ? "true" : "false");
    const [name, setName] = useState(fee.name);
    const [payableAmount, setPayableAmount] = useState(fee.payable_amount);
    const [paymentDate, setPaymentDate] = useState(new Date(fee.payment_date.toDate()).toISOString());
    const [registrationNumber] = useState(fee.registration_number.toString()); // Making it uneditable
    const [remarks, setRemarks] = useState(fee.remarks);

    const handleUpdate = async () => {
        try {
            const updatedFee = {
                amount_due: parseInt(amountDue),
                amount_paid: parseInt(amountPaid),
                late_fees: lateFees === "true" ? true : false,
                name,
                payable_amount: payableAmount,
                payment_date: firestore.Timestamp.fromDate(new Date(paymentDate)),
                registration_number: parseInt(registrationNumber),
                remarks,
                student: fee.student,
            };

            await firestore().collection('fee').doc(registrationNumber).update(updatedFee);

            Alert.alert('Success', 'Fee updated successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await firestore().collection('fee').doc(registrationNumber).delete();

            Alert.alert('Success', 'Fee deleted successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Fee</Text>
                    <Field placeholder="Registration Number" keyboardType="numeric" value={registrationNumber} editable={false} />
                    <Field placeholder="Name" value={name} onChangeText={setName} editable={false} />
                    <Field placeholder="Amount Due" keyboardType="numeric" value={amountDue} onChangeText={setAmountDue} />
                    <Field placeholder="Amount Paid" keyboardType="numeric" value={amountPaid} onChangeText={setAmountPaid} />
                    <Field placeholder="Late Fees (true/false)" value={lateFees} onChangeText={setLateFees} />
                    <Field placeholder="Payable Amount" value={payableAmount} onChangeText={setPayableAmount} />
                    <Field placeholder="Payment Date (YYYY-MM-DD)" value={paymentDate} onChangeText={setPaymentDate} />
                    <Field placeholder="Remarks" value={remarks} onChangeText={setRemarks} />
                    
                    <Btn pad={12} bgColor="#4F7942" textColor="white" btnText="Save" Press={handleUpdate} />
                    <Btn pad={12} bgColor="#D22B2B" textColor="white" btnText="Delete" Press={handleDelete} />
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 70,
        marginBottom: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default FeeDetail;
