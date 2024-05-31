import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput } from 'react-native';
import Background1 from './Background1';
import Btn from './Btn';
import firestore from '@react-native-firebase/firestore';

const ClassLookup = (props) => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [marks, setMarks] = useState(null);

    const handleSearch = async () => {
        if (registrationNumber === '') {
            Alert.alert('Please enter a registration number.');
            return;
        }

        try {
            const doc = await firestore().collection('marks').doc(registrationNumber.toString()).get();
            if (doc.exists) {
                setMarks(doc.data());
            } else {
                Alert.alert('No marks found for this registration number.');
            }
        } catch (error) {
            console.error('Error fetching marks:', error);
            Alert.alert('Error fetching marks:', error.message);
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>View Student Marks</Text>
                    <TextInput
                        placeholder="Enter Registration Number"
                        keyboardType="numeric"
                        value={registrationNumber}
                        onChangeText={setRegistrationNumber}
                        style={styles.inputField}
                    />
                    <Btn pad={12} bgColor='blue' textColor='white' btnText='Search Marks' Press={handleSearch} />
                    
                    {marks && (
                        <View style={styles.marksContainer}>
                            <Text style={styles.subtitle}>First Term Marks</Text>
                            {marks.first ? marks.first.map((mark, index) => (
                                <Text key={index} style={styles.markText}>{`Subject ${index + 1}: ${mark}`}</Text>
                            )) : <Text>No First Term Marks</Text>}

                            <Text style={styles.subtitle}>Mid Term Marks</Text>
                            {marks.midterm ? marks.midterm.map((mark, index) => (
                                <Text key={index} style={styles.markText}>{`Subject ${index + 1}: ${mark}`}</Text>
                            )) : <Text>No Mid Term Marks</Text>}

                            <Text style={styles.subtitle}>Final Term Marks</Text>
                            {marks.finalterm ? marks.finalterm.map((mark, index) => (
                                <Text key={index} style={styles.markText}>{`Subject ${index + 1}: ${mark}`}</Text>
                            )) : <Text>No Final Term Marks</Text>}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 20,
        width: '100%',
        maxWidth: 600,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'black',
        textAlign: 'center',
    },
    inputField: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
    },
    marksContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    markText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
});

export default ClassLookup;
