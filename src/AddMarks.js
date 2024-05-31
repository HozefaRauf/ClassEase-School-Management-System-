import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TextInput, ScrollView } from 'react-native';
import Background1 from './Background1';
import Btn from './Btn';
import firestore from '@react-native-firebase/firestore';
import Field from './Field';

const AddMarks = (props) => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [firstTermMarks, setFirstTermMarks] = useState(['', '', '', '']);
    const [midTermMarks, setMidTermMarks] = useState(['', '', '', '']);
    const [finalTermMarks, setFinalTermMarks] = useState(['', '', '', '']);
    const [subjectNumbers, setSubjectNumbers] = useState(4);

    const handleMarksChange = (text, index, term) => {
        const newMarks = parseInt(text);
        let maxMarks;
        switch (term) {
            case 'first':
            case 'midterm':
                maxMarks = 50;
                break;
            case 'finalterm':
                maxMarks = 100;
                break;
            default:
                return;
        }

        if (!isNaN(newMarks) && newMarks <= maxMarks) {
            let updatedMarks;
            switch (term) {
                case 'first':
                    updatedMarks = [...firstTermMarks];
                    updatedMarks[index] = text;
                    setFirstTermMarks(updatedMarks);
                    break;
                case 'midterm':
                    updatedMarks = [...midTermMarks];
                    updatedMarks[index] = text;
                    setMidTermMarks(updatedMarks);
                    break;
                case 'finalterm':
                    updatedMarks = [...finalTermMarks];
                    updatedMarks[index] = text;
                    setFinalTermMarks(updatedMarks);
                    break;
                default:
                    break;
            }
        } else if (text === '') {
            let updatedMarks;
            switch (term) {
                case 'first':
                    updatedMarks = [...firstTermMarks];
                    updatedMarks[index] = '';
                    setFirstTermMarks(updatedMarks);
                    break;
                case 'midterm':
                    updatedMarks = [...midTermMarks];
                    updatedMarks[index] = '';
                    setMidTermMarks(updatedMarks);
                    break;
                case 'finalterm':
                    updatedMarks = [...finalTermMarks];
                    updatedMarks[index] = '';
                    setFinalTermMarks(updatedMarks);
                    break;
                default:
                    break;
            }
        } else {
            Alert.alert(`Marks cannot be greater than ${maxMarks}`);
        }
    };

    const handleAddMarks = async (term) => {
        try {
            const doc = await firestore().collection('marks').doc(registrationNumber.toString()).get();
            if (doc.exists && doc.data()[term]) {
                Alert.alert(`Marks for ${term} already exist for this registration number.`);
                return;
            }

            let marks;
            switch (term) {
                case 'first':
                    marks = firstTermMarks;
                    break;
                case 'midterm':
                    marks = midTermMarks;
                    break;
                case 'finalterm':
                    marks = finalTermMarks;
                    break;
                default:
                    return;
            }

            await firestore().collection('marks').doc(registrationNumber.toString()).set(
                { [term]: marks },
                { merge: true }
            );
            Alert.alert(`${term} marks added successfully!`);
        } catch (error) {
            console.error(`Error adding ${term} marks:`, error);
            Alert.alert(`Error adding ${term} marks: `, error.message);
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add Student Marks</Text>
                    <Field
                        placeholder="Enter Registration Number"
                        keyboardType="numeric"
                        value={registrationNumber}
                        onChangeText={setRegistrationNumber}
                        style={styles.inputField}
                    />
                    <Text style={styles.subtitle}>First Term Marks</Text>
                    {firstTermMarks.map((mark, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            placeholder={`Subject ${index + 1}`}
                            keyboardType="numeric"
                            value={mark}
                            onChangeText={(text) => handleMarksChange(text, index, 'first')}
                        />
                    ))}
                    <Btn pad={12} bgColor='green' textColor='white' btnText='Add First Term Marks' Press={() => handleAddMarks('first')} />

                    <Text style={styles.subtitle}>Mid Term Marks</Text>
                    {midTermMarks.map((mark, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            placeholder={`Subject ${index + 1}`}
                            keyboardType="numeric"
                            value={mark}
                            onChangeText={(text) => handleMarksChange(text, index, 'midterm')}
                        />
                    ))}
                    <Btn pad={12} bgColor='blue' textColor='white' btnText='Add Mid Term Marks' Press={() => handleAddMarks('midterm')} />

                    <Text style={styles.subtitle}>Final Term Marks</Text>
                    {finalTermMarks.map((mark, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            placeholder={`Subject ${index + 1}`}
                            keyboardType="numeric"
                            value={mark}
                            onChangeText={(text) => handleMarksChange(text, index, 'finalterm')}
                        />
                    ))}
                    <Btn pad={12} bgColor='red' textColor='white' btnText='Add Final Term Marks' Press={() => handleAddMarks('finalterm')} />
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
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
        alignSelf: 'center',
    },
});

export default AddMarks;
